import {
  Autocomplete,
  Box,
  Button,
  createFilterOptions,
  TextField,
  Typography,
} from "@mui/material";

import { Link } from "react-router-dom";

import { useEffect, useState } from "react";

import { useLazyGetSearchBooksQuery } from "../../../store/api/bookapi/book.api";
import useDebounce from "../../hooks/useDebounce";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import { setSearch } from "../../../store/search/searchSlice";

const OPTIONS_LIMIT = 5;
const filterOptions = createFilterOptions({
  limit: OPTIONS_LIMIT,
});

export const SearchBar = () => {
  const [searchBooks, { isLoading, isError, data, error }] =
    useLazyGetSearchBooksQuery();
  const searchResult = useSelector((state: RootState) => state.search);
  const dispatch: AppDispatch = useDispatch();

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
      dispatch(setSearch(data));
    }
  }, [isLoading, data]);
  return (
    <>
      <Box flexGrow={1} marginX={2}>
        <Autocomplete
          filterOptions={filterOptions}
          freeSolo
          id="navbar-search-bar"
          disableClearable
          options={searchResult.map(
            (option) => option.title + " by " + option.authors[0]
          )}
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
