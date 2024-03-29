import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  CircularProgress,
  Grid,
  IconButton,
  Pagination,
  Paper,
  Snackbar,
  Typography,
} from "@mui/material";

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CloseIcon from "@mui/icons-material/Close";

import { useState } from "react";

import { Link } from "react-router-dom";

import { BACKEND_BASE_URL, TAGS_LIST } from "../../common/config";
import { bookData } from "../../common/interfaces/responses/book.res.interface";
import TagFilter from "../../common/components/TagFiltering/TagFilter";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { addItem } from "../../store/shoppingcart/shoppingcartSlice";

const HomePage = () => {
  const [currentData, setCurrentData] = useState<bookData[]>([]);
  const dispatch: AppDispatch = useDispatch();

  const itemsPerPage = 9;
  const totalItems = currentData?.length || 0;
  const lastPageIndex = Math.ceil(totalItems / 9);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setCurrentPage(value);
    scrollToTop();
  };

  const onQueryChange = (data: bookData[]) => {
    setCurrentData(data);
    setCurrentPage(() => 1);
  };

  const handleAddItemToCart = (
    key: string,
    value: { title: string; price: number; img: string }
  ) => {
    dispatch(addItem({ key: key, value: value }));
    scrollToTop();
    setSnackbarOpen(true);
  };

  //snackbar feedback
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleSnackbarClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackbarOpen(() => false);
  };

  return (
    <Grid container spacing={1}>
      <Grid item xs={12} md={3}>
        <TagFilter
          onQueryData={onQueryChange}
          tags={TAGS_LIST}
          presetFirstTag={false}
        />
      </Grid>
      <Grid item xs={12} md={9}>
        <Paper>
          <Box paddingX={1} paddingY={2} marginY={2}>
            <Grid container gap={1}>
              {!currentData && <CircularProgress />}
              {currentData &&
                currentData.map((book, index) => {
                  if (
                    index >= (currentPage - 1) * itemsPerPage &&
                    index < currentPage * itemsPerPage
                  ) {
                    return (
                      <Grid key={"mainbookcard" + book.id} item xs={12}>
                        <Box
                          paddingY={2}
                          paddingX={1}
                          display={"flex"}
                          justifyContent={"center"}
                        >
                          <Card
                            key={"bookcard" + book.id}
                            sx={{
                              display: "flex",
                              flexDirection: { xs: "column", md: "row" },
                              width: { md: "80%", xs: "90%" },
                            }}
                          >
                            <Box
                              paddingX={1}
                              display={"flex"}
                              justifyContent={"center"}
                            >
                              <Paper elevation={3} sx={{ margin: 1 }}>
                                <Box
                                  height={150}
                                  width={150}
                                  overflow={"clip"}
                                  marginY={2}
                                  marginX={1}
                                >
                                  <CardMedia
                                    component="img"
                                    sx={{ width: "100%" }}
                                    image={
                                      BACKEND_BASE_URL +
                                      "book/image/" +
                                      book.images[0]
                                    }
                                    alt={book.title}
                                  />
                                </Box>
                              </Paper>
                            </Box>

                            <Box display={"flex"} flexDirection={"column"}>
                              <CardContent>
                                <Typography component="div" variant="h5">
                                  {book.title}
                                </Typography>
                                <Typography
                                  variant="subtitle1"
                                  color="text.secondary"
                                  component="div"
                                >
                                  {"by " +
                                    book.authors
                                      .map((author) => author)
                                      .join(" ")}
                                </Typography>
                              </CardContent>
                              <Box
                                display={"flex"}
                                justifyContent={"row-start"}
                                flexWrap={"wrap"}
                                gap={1}
                                marginX={1}
                              >
                                {book.tags.map((tagName, index) => {
                                  if (index < 3) {
                                    return (
                                      <Chip
                                        key={"bookchip" + tagName + book.id}
                                        label={tagName.toLowerCase()}
                                      />
                                    );
                                  }
                                })}
                              </Box>
                              <Box marginX={1}>
                                {
                                  <Typography
                                    variant="caption"
                                    color={"text.secondary"}
                                  >
                                    {"Price:" + book.price}
                                  </Typography>
                                }
                              </Box>
                              <Box
                                display={"flex"}
                                flexDirection={"row"}
                                justifyContent={"row-start"}
                              >
                                <Link to={"book/" + book.id}>
                                  <Button variant="text">view more</Button>
                                </Link>
                                <IconButton
                                  onClick={() =>
                                    handleAddItemToCart(book.id.toString(), {
                                      title: book.title,
                                      price: book.price,
                                      img: book.images[0],
                                    })
                                  }
                                >
                                  <ShoppingCartIcon />
                                </IconButton>
                                <Snackbar
                                  open={snackbarOpen}
                                  autoHideDuration={1500}
                                  onClose={handleSnackbarClose}
                                >
                                  <Alert
                                    onClose={handleSnackbarClose}
                                    severity="success"
                                  >
                                    Product added to the cart!
                                  </Alert>
                                </Snackbar>
                              </Box>
                            </Box>
                          </Card>
                        </Box>
                      </Grid>
                    );
                  }
                })}
            </Grid>
          </Box>
        </Paper>
        <Box display={"flex"} justifyContent={"center"} marginBottom={4}>
          <Pagination
            size="small"
            count={lastPageIndex}
            color="primary"
            onChange={handlePageChange}
            page={currentPage}
          />
        </Box>
      </Grid>
    </Grid>
  );
};

export default HomePage;
