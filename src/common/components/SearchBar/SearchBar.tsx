import {
  Box,
  TextField,
  Typography,
  Avatar,
  List,
  ListItem,
  Divider,
  ListItemAvatar,
  ListItemText,
  ListItemButton,
} from "@mui/material";

import React, { useEffect, useState } from "react";

import { useLazyGetSearchBooksQuery } from "../../../store/api/bookapi/book.api";
import useDebounce from "../../hooks/useDebounce";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import { setSearch } from "../../../store/search/searchSlice";

import { BACKEND_BASE_URL } from "../../config";
import { useNavigate } from "react-router-dom";
import { setSearchToggle } from "../../../store/searchToggle/searchToggleSlice";

const MAX_DISPLAY_VALUE = 3;

export const SearchBar = () => {
  const navigation = useNavigate();
  const [searchBooks, { isLoading, isError, data, error }] =
    useLazyGetSearchBooksQuery();

  const searchResult = useSelector((state: RootState) => state.search);
  const dispatch: AppDispatch = useDispatch();

  const [showMore, setShowMore] = useState<number>(0);
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
    event.currentTarget.value !== ""
      ? setAnchorEl(event.currentTarget)
      : setAnchorEl(null);
  };

  useEffect(() => {
    if (!isLoading && !isError && data) {
      dispatch(setSearch(data));
    }
  }, [isLoading, data]);

  // popover
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <>
      <Box flexGrow={1} marginX={2}>
        <TextField
          fullWidth
          id="search"
          name="search"
          onChange={handleInputChange}
          variant="standard"
          label="Search Books"
        />

        <List sx={{ width: "100%", bgcolor: "background.papper" }}>
          {searchResult.map((book, index) => {
            if (index < MAX_DISPLAY_VALUE + showMore) {
              return (
                <React.Fragment key={"fragment" + book.id}>
                  <ListItem alignItems="flex-start" key={"listitem" + book.id}>
                    <ListItemButton
                      onClick={() => {
                        dispatch(setSearchToggle());
                        navigation(`book/${book.id}`);
                      }}
                    >
                      <ListItemAvatar>
                        <Avatar
                          alt="Remy Sharp"
                          src={
                            BACKEND_BASE_URL + "book/image/" + book.images[0]
                          }
                        />
                      </ListItemAvatar>
                      <ListItemText
                        primary={book.title}
                        secondary={book.authors[0] ? book.authors[0] : "NA"}
                      />
                    </ListItemButton>
                  </ListItem>
                  <Divider variant="inset" component="li" />
                </React.Fragment>
              );
            }
          })}
          <ListItem alignItems="flex-start">
            <ListItemButton
              disabled={searchResult.length < MAX_DISPLAY_VALUE}
              onClick={
                showMore == 0
                  ? () => {
                      setShowMore((state) => state + 3);
                    }
                  : () => {
                      setShowMore((state) => state - 3);
                    }
              }
            >
              <ListItemText
                secondary={showMore == 0 ? "show more" : "show less"}
              />
            </ListItemButton>
          </ListItem>
          <Divider component="li" />
        </List>
      </Box>
      {isError && (
        <Typography color={"error"} variant="caption" gutterBottom>
          {JSON.stringify(error)}
        </Typography>
      )}
    </>
  );
};
