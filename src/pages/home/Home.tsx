import {
  Container,
  Grid,
  Box,
  Typography,
  Checkbox,
  FormControlLabel,
  List,
  CircularProgress,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  CardActions,
  Button,
} from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";
import { useGetBooksQuery } from "../../store/api/bookapi/book.api";
import { BACKEND_BASE_URL } from "../../common/config";
import { bookData } from "../../common/interfaces/responses/book.res.interface";
import { AddShoppingCart } from "@mui/icons-material";

const HomePage = () => {
  const [checkedFilters, setCheckedFilters] = useState<string[]>([]);
  const { isLoading, isError, isSuccess, error, data } =
    useGetBooksQuery(checkedFilters);

  // Handler for filter change
  const handleFilterChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    // Update checked filters based on the checkbox status
    if (checked) {
      setCheckedFilters((prevFilters) => [...prevFilters, name]);
    } else {
      setCheckedFilters((prevFilters) =>
        prevFilters.filter((filter) => filter !== name)
      );
    }
  };

  //Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 9;
  const [currentBooks, setCurrentBooks] = useState<bookData[]>([]);

  // Calculate the indexes of the books to display for the current page
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;

  // Function to handle next page
  const nextPage = () => {
    setCurrentPage(currentPage + 1);
    scrollToTop();
  };

  // Function to handle previous page
  const prevPage = () => {
    setCurrentPage(currentPage - 1);
    scrollToTop();
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    if (!isLoading && isSuccess && data) {
      setCurrentBooks(data.slice(indexOfFirstBook, indexOfLastBook));
    }
  }, [currentPage, isSuccess, data]);

  return (
    <Container maxWidth="lg" sx={{ marginTop: 4 }}>
      <Grid container spacing={2}>
        {/* Filter menu */}
        <Grid item xs={3}>
          <Box borderRight={1} paddingRight={2}>
            <Typography variant="h5" gutterBottom>
              Filters
            </Typography>
            <FormControlLabel
              control={
                <Checkbox onChange={handleFilterChange} name="FANTASY" />
              }
              label="FANTASY"
            />
            <FormControlLabel
              control={
                <Checkbox onChange={handleFilterChange} name="ADVENTURE" />
              }
              label="ADVENTURE"
            />
            {/* Add more filters as needed */}
          </Box>
        </Grid>

        {
          /* Book list */
          isSuccess && (
            <Grid item xs={9}>
              <Grid container spacing={2}>
                {currentBooks.map((book) => (
                  <Grid item xs={4} key={book.id}>
                    {" "}
                    {/* Display 3 cards per row */}
                    <Card sx={{ maxWidth: 345 }}>
                      <CardActionArea>
                        <CardMedia
                          component="img"
                          height="140"
                          image={`${BACKEND_BASE_URL}book/image/${book.images[0]}`}
                          alt={`${book.title}0`}
                          id={"" + book.id}
                        />
                        <CardContent>
                          <Typography gutterBottom variant="h5" component="div">
                            {book.title}
                          </Typography>
                          <Typography color="text.secondary">{`Price: ${book.price}$`}</Typography>
                          <Typography variant="body2" color="text.secondary">
                            {`${book.description.slice(0, 120)}...`}
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                      <CardActions sx={{ justifyContent: "space-between" }}>
                        <Button size="small" color="primary">
                          View
                        </Button>
                        <Button
                          size="small"
                          color="primary"
                          startIcon={<AddShoppingCart />}
                        >
                          Add To Cart
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                ))}
              </Grid>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={prevPage}
                disabled={currentPage === 1}
              >
                Prev Page
              </Button>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={nextPage}
                disabled={indexOfLastBook >= data.length}
              >
                Next Page
              </Button>
            </Grid>
          )
        }
        {isLoading && (
          <Box sx={{ display: "flex" }}>
            <CircularProgress />
          </Box>
        )}
        {isError && <p>{JSON.stringify(error)}</p>}
      </Grid>
    </Container>
  );
};

export default HomePage;
