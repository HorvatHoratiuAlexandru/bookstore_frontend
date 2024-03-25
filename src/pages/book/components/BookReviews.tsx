import {
  Box,
  Button,
  Rating,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { ChangeEvent, SyntheticEvent, useState } from "react";

import ratings from "./ReviewConfigs";

const BookReviews = () => {
  const authData = useSelector((state: RootState) => state.userAuth);

  const [grade, setGrade] = useState<number>(1);
  const [tooltipGrade, setTooltipGrade] = useState<number>(1);
  const [userReview, setUserReview] = useState<string>("");

  const handleHoverChange = (event: any, newValue: any) => {
    setTooltipGrade(newValue);
  };

  const handleClick = (
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

  return (
    <Box>
      <Stack>
        <Box>
          <Typography>Average rating: X from xxx reviews.</Typography>
        </Box>
        <Box>
          {!authData.isLoggedIn && (
            <Box paddingX={2} marginY={2}>
              <Stack>
                <Tooltip title={ratings[tooltipGrade]}>
                  <Rating
                    name="hover-feedback"
                    precision={1}
                    onChangeActive={handleHoverChange}
                    onChange={handleClick}
                    onClick={() => handleClick}
                    defaultValue={2}
                    max={5}
                  />
                </Tooltip>

                <TextField
                  id="standard-basic"
                  label="Write you'r toughts about this book"
                  variant="standard"
                  multiline
                  rows={3}
                  onChange={handleUserInput}
                />
                <Box margin={1}>
                  <Button variant="outlined">Add review</Button>
                </Box>
              </Stack>
            </Box>
          )}

          <></>
        </Box>
        <Box>
          <Typography>LIST OF REVIEWS</Typography>
        </Box>
      </Stack>
    </Box>
  );
};

export default BookReviews;
