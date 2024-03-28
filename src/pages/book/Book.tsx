import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

import { useNavigate, useParams } from "react-router-dom";
import { useGetBookQuery } from "../../store/api/bookapi/book.api";
import ImageGallery from "../../common/components/ImageGallery/ImageGallery";
import { useState } from "react";
import { bookData } from "../../common/interfaces/responses/book.res.interface";
import TagFilter from "../../common/components/TagFiltering/TagFilter";

import { BACKEND_BASE_URL } from "../../common/config";
import BookReviews from "./components/BookReviews";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { addItem } from "../../store/shoppingcart/shoppingcartSlice";

const BookPage = () => {
  const { bookId } = useParams();
  const parsedBookId: string = bookId ? String(bookId) : "1";
  const { isLoading, isError, data, error } = useGetBookQuery(
    Number.parseInt(parsedBookId)
  );

  const [suggestedBookData, setSuggestedBookData] = useState<bookData[]>([]);

  const [from, setFrom] = useState<number>(0);
  const [to, setTo] = useState(3);

  const onQueryData = (books: bookData[]) => {
    const suggestion = books
      .map((book) => {
        if (data && book.id !== data.id) {
          return book;
        }
        return null;
      })
      .filter((book) => book !== null) as bookData[]; // Filter out null values

    setSuggestedBookData(suggestion);
  };

  const navigation = useNavigate();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handlePrev = () => {
    setFrom((fromState) => fromState - 3);
    setTo((prevState) => prevState - 3);
  };

  const handleNext = () => {
    setFrom((fromState) => fromState + 3);
    setTo((prevState) => prevState + 3);
  };

  // shopping cart
  const dispatch: AppDispatch = useDispatch();

  const handleAddToCart = () => {
    if (data) {
      dispatch(
        addItem({
          key: data.id.toString(),
          value: {
            title: data.title,
            price: data.price,
            img: data.images[0],
          },
        })
      );
    }
  };

  return (
    <>
      {isLoading && <CircularProgress />}
      {isError && <Typography>{JSON.stringify(error)}</Typography>}
      {data && (
        <Stack>
          <Grid container gap={2} justifyContent={"center"} marginY={2}>
            <Grid item xs={9}>
              <Paper variant="outlined">
                <Box
                  display={"flex"}
                  justifyContent={"flex-start"}
                  flexDirection={{ xs: "column", md: "column", lg: "row" }}
                  alignItems={"stretch"}
                >
                  <Box>
                    <ImageGallery urls={data.images} />
                  </Box>
                  <Box marginX={1} marginY={2}>
                    <Typography variant="h5">{data.title}</Typography>
                    <Typography variant="body1" color={"text.secondary"}>
                      {"by " + data.authors.join(",")}
                    </Typography>
                    <Typography variant="body1">
                      {data.tags.join(", ")}
                    </Typography>
                  </Box>
                  <Box marginX={1} marginY={3}>
                    <Paper elevation={3}>
                      <Box padding={1} margin={1}>
                        <Stack rowGap={1}>
                          <Typography gutterBottom variant="h6">
                            {"Price: " + data.price + "$"}
                          </Typography>
                          <Typography
                            gutterBottom
                            variant="body1"
                            color={"text.secondary"}
                          >
                            {"On Stock: " + data.stock}
                          </Typography>
                          <Button
                            onClick={handleAddToCart}
                            startIcon={<ShoppingCartIcon />}
                            variant="contained"
                          >
                            <Typography variant="body1" noWrap>
                              Add to cart
                            </Typography>
                          </Button>
                          <Button
                            startIcon={<FavoriteBorderIcon />}
                            variant="contained"
                          >
                            <Typography variant="body1" noWrap>
                              Add to wishlist
                            </Typography>
                          </Button>
                        </Stack>
                      </Box>
                    </Paper>
                    <Paper elevation={3}>
                      <Box padding={1}>
                        <Typography variant="h6" color={"primary"}>
                          {"Rating:" + data.grade}
                        </Typography>
                      </Box>
                    </Paper>
                  </Box>
                </Box>
              </Paper>
            </Grid>

            <Grid item xs={9}>
              <Box
                display={"flex"}
                justifyContent={"flex-start"}
                flexDirection={"column"}
                alignItems={"stretch"}
              >
                <Paper>
                  <Box padding={3}>
                    <Typography variant="body1">{data.description}</Typography>
                  </Box>
                </Paper>
              </Box>
            </Grid>

            <Grid item xs={9}>
              <Box
                display={"flex"}
                justifyContent={"flex-start"}
                flexDirection={"column"}
                alignItems={"stretch"}
                width={"100%"}
              >
                <Paper>
                  <BookReviews bookId={data.id} grade={data.grade} />
                </Paper>
              </Box>
            </Grid>

            <Grid item xs={9}>
              <Stack>
                <Box width={"60%"}>
                  <Typography variant="body1">
                    Search for books with the same tags:
                  </Typography>
                  <TagFilter
                    onQueryData={onQueryData}
                    tags={data.tags}
                    presetFirstTag={true}
                  />
                </Box>
                <Box>
                  <List sx={{ width: "100%", bgcolor: "background.paper" }}>
                    {suggestedBookData.map((book, index) => {
                      if (index < to && index >= from && book.id !== data.id) {
                        return (
                          <ListItem>
                            <ListItemButton
                              onClick={() => {
                                navigation(`/book/${book.id}`);
                                scrollToTop();
                              }}
                            >
                              <ListItemAvatar>
                                <Avatar
                                  src={
                                    BACKEND_BASE_URL +
                                    "book/image/" +
                                    book.images[0]
                                  }
                                />
                              </ListItemAvatar>
                              <ListItemText
                                primary={<Typography>{book.title}</Typography>}
                              />
                            </ListItemButton>
                          </ListItem>
                        );
                      }
                    })}
                  </List>
                  <Button onClick={handlePrev} disabled={from === 0}>
                    Prev
                  </Button>
                  <Button
                    onClick={handleNext}
                    disabled={to >= suggestedBookData.length}
                  >
                    Next
                  </Button>
                </Box>
              </Stack>
            </Grid>
          </Grid>
        </Stack>
      )}
    </>
  );
};

export default BookPage;
