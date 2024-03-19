import {
  AppBar,
  Autocomplete,
  Box,
  Button,
  Collapse,
  IconButton,
  Menu,
  MenuItem,
  TextField,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  LOGGED_IN_USER_MENU_PAGES,
  NOT_LOGGED_IN_USER_MENU_PAGES,
} from "../../config";
import { useLazyGetSearchBooksQuery } from "../../../store/api/bookapi/book.api";
import { bookData } from "../../interfaces/responses/book.res.interface";
import useDebounce from "../../hooks/useDebounce";

const NavBar = () => {
  const authData = useSelector((state: RootState) => state.userAuth);
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

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  return (
    <>
      <AppBar position="static" color="primary">
        <Box paddingX={4}>
          <Toolbar>
            <Box>
              <Typography variant="h6">
                <Link
                  to={"/"}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  BookStore
                </Link>
              </Typography>
            </Box>
            <Box flexGrow={2}></Box>
            {!open ? (
              <IconButton
                color="default"
                aria-label="search"
                onClick={handleOpen}
              >
                <SearchIcon />
              </IconButton>
            ) : (
              <IconButton
                color="default"
                aria-label="search"
                onClick={handleClose}
              >
                <CloseIcon />
              </IconButton>
            )}

            {
              // **********
            }
            <Box>
              <Tooltip title="Open User Menu">
                <IconButton
                  color="default"
                  aria-label="account"
                  onClick={handleOpenUserMenu}
                >
                  <AccountCircleIcon />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {authData.isLoggedIn
                  ? LOGGED_IN_USER_MENU_PAGES.map(([link, page]) => (
                      <MenuItem key={page} onClick={handleCloseUserMenu}>
                        <Typography
                          color={link === "logout" ? "error" : "default"}
                          textAlign="center"
                        >
                          <Link
                            to={`/${link}`}
                            style={{ textDecoration: "none", color: "inherit" }}
                          >
                            {page}
                          </Link>
                        </Typography>
                      </MenuItem>
                    ))
                  : NOT_LOGGED_IN_USER_MENU_PAGES.map(([link, page]) => (
                      <MenuItem key={page} onClick={handleCloseUserMenu}>
                        <Typography textAlign="center">
                          <Link
                            to={`/${link}`}
                            style={{ textDecoration: "none", color: "inherit" }}
                          >
                            {page}
                          </Link>
                        </Typography>
                      </MenuItem>
                    ))}
              </Menu>
            </Box>
            {
              //******** */
            }
          </Toolbar>
        </Box>
      </AppBar>
      {!authData.isLoggedIn && (
        <Typography variant={"caption"} gutterBottom color={"text.secondary"}>
          You are not logged in: <Link to={"/register"}>register</Link> or{" "}
          <Link to={"/login"}>log in</Link>
        </Typography>
      )}
      <Collapse in={open}>
        {isError && (
          <Typography color={"error"} variant="caption" gutterBottom>
            {JSON.stringify(error)}
          </Typography>
        )}
        <Box marginTop={2}>
          <Toolbar>
            <IconButton onClick={handleClose}>
              <ArrowBackIcon />
            </IconButton>
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
            <Button variant="outlined">Search</Button>
          </Toolbar>
        </Box>
      </Collapse>
    </>
  );
};

export default NavBar;
