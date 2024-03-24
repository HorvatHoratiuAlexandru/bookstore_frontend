import {
  Box,
  Button,
  CircularProgress,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

import { useParams } from "react-router-dom";
import { useGetBookQuery } from "../../store/api/bookapi/book.api";
import ImageGallery from "../../common/components/ImageGallery/ImageGallery";

const BookPage = () => {
  const { bookId } = useParams();
  const parsedBookId: string = bookId ? String(bookId) : "1";
  const { isLoading, isError, data, error } = useGetBookQuery(
    Number.parseInt(parsedBookId)
  );

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
                  flexDirection={"row"}
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
                            startIcon={<ShoppingCartIcon />}
                            variant="contained"
                          >
                            <Typography variant="body1" noWrap>
                              Adauga in cos
                            </Typography>
                          </Button>
                          <Button
                            startIcon={<FavoriteBorderIcon />}
                            variant="contained"
                          >
                            <Typography variant="body1" noWrap>
                              Adauga in wishlist
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
                  <Stack>
                    <Box margin={1} padding={1}>
                      <Typography variant="h5">Ratings</Typography>
                      <Typography variant="h6">
                        {"Grade: " + data.grade}
                      </Typography>
                    </Box>
                    <Box margin={1}>
                      <Typography variant="body1">Review1</Typography>
                      <Typography variant="body1">Review1</Typography>
                      <Typography variant="body1">Review1</Typography>
                      <Typography variant="body1">Review1</Typography>
                    </Box>
                  </Stack>
                </Paper>
              </Box>
            </Grid>

            <Grid item xs={9}>
              <Box
                display={"flex"}
                justifyContent={"flex-start"}
                flexDirection={"column"}
                width={"100%"}
                bgcolor={"red"}
              >
                <Box>
                  <Typography>books with the same tags</Typography>
                </Box>
                <Box>
                  <Typography variant="body1">book icons carousel</Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Stack>
      )}
    </>
  );
};

export default BookPage;
