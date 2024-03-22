import {
  Autocomplete,
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
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import { useGetBooksQuery } from "../../store/api/bookapi/book.api";
import { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import { BACKEND_BASE_URL, TAGS_LIST } from "../../common/config";
import { bookData } from "../../common/interfaces/responses/book.res.interface";

const HomePage = () => {
  //tags
  const [isDisabledTagButton, setIsDisabledTagButton] = useState<boolean>(true);
  const [activeTags, setActiveTags] = useState<string[]>([]);

  const [value, setValue] = useState<string | null>("");
  const [inputValue, setInputValue] = useState("");

  const isInputNotATag = (inputTag: string) => {
    if (TAGS_LIST.includes(inputTag)) {
      if (isDisabledTagButton) {
        setIsDisabledTagButton(() => false);
      }
      return false;
    } else {
      if (!isDisabledTagButton) {
        setIsDisabledTagButton(() => true);
      }
      return true;
    }
  };

  const handleAddTagClick = () => {
    if (!isInputNotATag(inputValue) && !activeTags.includes(inputValue)) {
      setActiveTags((prevTags) => [...prevTags, inputValue]);
      setCurrentPage(() => 1);
    }
  };

  const handleChipDelete = (chip: string) => {
    setActiveTags((state) => {
      return state.filter((item) => item !== chip);
    });
  };

  const { isLoading, isError, data, error } = useGetBooksQuery(activeTags);

  const [currentData, setCurrentData] = useState<bookData[]>([]);

  const itemsPerPage = 9;
  const totalItems = data?.length || 0;
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

  useEffect(() => {
    if (!isLoading && !isError && data) {
      setCurrentData(data);
    }
  }, [isLoading, data]);

  const handleViewMore = (id: number) => {};
  return (
    <Grid container spacing={1}>
      <Grid item xs={12} md={3}>
        <Paper>
          {isError && (
            <Typography variant="body1">{JSON.stringify(error)}</Typography>
          )}
          <Box paddingX={1} paddingY={2} marginY={2}>
            <Stack gap={1}>
              <Autocomplete
                value={value}
                onChange={(event: any, newValue: string | null) => {
                  isInputNotATag(newValue ? newValue : "");
                  setValue(newValue);
                }}
                inputValue={inputValue}
                onInputChange={(event, newInputValue) => {
                  isInputNotATag(newInputValue);
                  setInputValue(newInputValue);
                }}
                id="controllable-states-demo"
                options={TAGS_LIST}
                sx={{ width: "100%" }}
                renderInput={(params) => (
                  <TextField {...params} label="Add a tag" />
                )}
              />

              <Button
                disabled={isDisabledTagButton}
                onClick={() => handleAddTagClick()}
                variant="outlined"
              >
                Add
              </Button>
              <Box
                display={"flex"}
                flexDirection={"row"}
                flexWrap={"wrap"}
                gap={1}
              >
                {activeTags.map((tag) => {
                  return (
                    <Chip
                      key={tag}
                      label={tag}
                      onDelete={() => handleChipDelete(tag)}
                    />
                  );
                })}
              </Box>
            </Stack>
          </Box>
        </Paper>
      </Grid>
      <Grid item xs={12} md={9}>
        <Paper>
          <Box paddingX={1} paddingY={2} marginY={2}>
            <Grid container gap={1}>
              {isLoading && <CircularProgress />}
              {!isLoading &&
                !isError &&
                data &&
                data.map((book, index) => {
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
                                <IconButton>
                                  <ShoppingCartIcon />
                                </IconButton>
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
