import {
  Autocomplete,
  Box,
  Button,
  TextField,
  Typography,
} from "@mui/material";

import { Link } from "react-router-dom";

import { useEffect, useState } from "react";

import { useLazyGetSearchBooksQuery } from "../../../store/api/bookapi/book.api";
import { bookData } from "../../interfaces/responses/book.res.interface";
import useDebounce from "../../hooks/useDebounce";

export const SearchBar = () => {
  const [searchBooks, { isLoading, isError, data, error }] =
    useLazyGetSearchBooksQuery();

  const [searchResult, setSearchResult] = useState<bookData[]>([]);
  const [typing, setTyping] = useState<string>("");

  useDebounce(
    () => {
      searchBooks(typing);
    },
    [typing],
    500
  );

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setTyping(event.currentTarget.value);
  };

  useEffect(() => {
    if (!isLoading && !isError && data) {
      setSearchResult(data);
    }
  }, [isLoading, data]);
  return (
    <>
      <Box flexGrow={1} marginX={2}>
        <Autocomplete
          freeSolo
          id="navbar-search-bar"
          disableClearable
          options={searchResult.map((option) => option.title)}
          renderInput={(params) => (
            <TextField
              onChange={(e) => handleInputChange(e)}
              variant="standard"
              {...params}
              label="Search Books"
              InputProps={{
                ...params.InputProps,
                type: "search",
              }}
            />
          )}
        />
      </Box>
      <Link to={`search?search=${typing}`}>
        <Button variant="outlined">Search</Button>
      </Link>
      {isError && (
        <Typography color={"error"} variant="caption" gutterBottom>
          {JSON.stringify(error)}
        </Typography>
      )}
    </>
  );
};
