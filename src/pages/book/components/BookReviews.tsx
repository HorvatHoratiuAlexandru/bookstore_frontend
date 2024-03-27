import {
  Box,
  Button,
  Divider,
  Rating,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { ChangeEvent, SyntheticEvent, useMemo, useState } from "react";

import { ratings, rawRatings } from "./ReviewConfigs";
import {
  useDeleteReviewMutation,
  useGetReviewsQuery,
  usePostReviewMutation,
  useUpdateReviewMutation,
} from "../../../store/api/reviewapi/review.api";

const BookReviews = (props: { bookId: number; grade: string }) => {
  const authData = useSelector((state: RootState) => state.userAuth);
  const { data, error, isLoading, isError } = useGetReviewsQuery(props.bookId);

  const [postReview] = usePostReviewMutation();
  const [updateReview] = useUpdateReviewMutation();
  const [deleteReview] = useDeleteReviewMutation();

  const [grade, setGrade] = useState<number>(-1);
  const [tooltipGrade, setTooltipGrade] = useState<number>(1);
  const [userReview, setUserReview] = useState<string>("");

  const [edit, setEdit] = useState<boolean>(false);

  const [from, setFrom] = useState<number>(0);
  const [to, setTo] = useState<number>(5);

  const handleHoverChange = (event: any, newValue: any) => {
    setTooltipGrade(newValue);
  };

  const handleStarClick = (
    event: SyntheticEvent<Element, Event>,
    newValue: any
  ) => {
    setGrade(newValue);
  };

  const handleUserInput = (
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setUserReview(event.target.value);
  };

  const handleSubmit = () => {
    if (!edit) {
      postReview({
        bookId: props.bookId,
        form: {
          grade: grade === -1 ? ratings[2] : ratings[grade],
          text: userReview,
        },
      });
    } else {
      updateReview({
        bookId: props.bookId,
        form: {
          grade: ratings[grade],
          text: userReview,
        },
      });
      setEdit((state) => !state);
    }
  };

  //return true so the form is disable, if edit is pressed enable it again
  const userAlreadyReviewed = () => {
    if (!isLoading && !isError && data) {
      const ownerReview = data.find(
        (reviewData) => reviewData.ownerUid === authData.uid
      );

      if (ownerReview && !edit) {
        setGrade(ratings.lastIndexOf(ownerReview.grade));
        setUserReview(ownerReview.text);
        return true;
      }
    }
    return false;
  };

  const isDisabled = useMemo(
    () => userAlreadyReviewed(),
    [isLoading, data, edit]
  );

  //delete the review from user
  const onDeleteReview = () => {
    deleteReview(props.bookId);
  };

  const onEdit = () => {
    setEdit((state) => !state);
  };

  const onNext = () => {
    setFrom((state) => state + 5);
    setTo((state) => state + 5);
  };

  const onBack = () => {
    setFrom((state) => state - 5);
    setTo((state) => state - 5);
  };

  return (
    <Box>
      <Stack>
        <Box padding={1}>
          {isError && <Typography>{JSON.stringify(error)}</Typography>}
          <Typography variant="body2">
            Average rating: <strong>{props.grade}</strong> from {data?.length}{" "}
            reviews.
          </Typography>
        </Box>
        <Box>
          {authData.isLoggedIn && (
            <Box paddingX={2} marginY={2}>
              <Stack>
                {isDisabled && (
                  <Box margin={1}>
                    <Typography>
                      You already reviewed this book want to edit or delete?
                    </Typography>
                    <Button
                      sx={{
                        margin: 1,
                      }}
                      onClick={onEdit}
                      variant="outlined"
                      disabled={!isDisabled}
                      size="small"
                    >
                      Edit
                    </Button>

                    <Button
                      sx={{
                        margin: 1,
                      }}
                      onClick={onDeleteReview}
                      variant="outlined"
                      disabled={!isDisabled}
                      size="small"
                    >
                      Delete
                    </Button>
                  </Box>
                )}
                <Tooltip title={ratings[tooltipGrade]}>
                  <Rating
                    disabled={isDisabled}
                    name="hover-feedback"
                    precision={1}
                    onChangeActive={handleHoverChange}
                    onChange={handleStarClick}
                    onClick={() => handleStarClick}
                    defaultValue={grade === -1 ? 2 : grade}
                    max={5}
                  />
                </Tooltip>

                <TextField
                  disabled={isDisabled}
                  id="standard-basic"
                  label="Write you'r toughts about this book"
                  variant="standard"
                  multiline
                  rows={3}
                  onChange={handleUserInput}
                  value={userReview}
                />
                <Box margin={1}>
                  <Button
                    onClick={handleSubmit}
                    variant="outlined"
                    disabled={isDisabled}
                  >
                    Add review
                  </Button>
                </Box>
              </Stack>
            </Box>
          )}

          <></>
        </Box>
        <Box>
          <Box padding={1}>
            <Stack gap={0.5}>
              {data &&
                data.map((reviewInfo, index) => {
                  if (
                    reviewInfo.ownerUid !== authData.uid &&
                    index >= from &&
                    index < to
                  )
                    return (
                      <Box padding={1} margin={1}>
                        <Typography variant="h6">
                          User: {reviewInfo.ownerName}
                        </Typography>
                        <Rating
                          disabled={true}
                          name="hover-feedback"
                          precision={1}
                          defaultValue={rawRatings.lastIndexOf(
                            reviewInfo.grade.toLowerCase()
                          )}
                          max={5}
                        />
                        <Typography variant="body1">
                          {reviewInfo.text}
                        </Typography>
                        <Divider />
                      </Box>
                    );
                })}
            </Stack>
            <Button disabled={from == 0 ? true : false} onClick={onBack}>
              Back
            </Button>
            <Button
              disabled={data && to >= data.length ? true : false}
              onClick={onNext}
            >
              Next
            </Button>
          </Box>
        </Box>
      </Stack>
    </Box>
  );
};

export default BookReviews;
