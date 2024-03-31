import {
  AppBar,
  Badge,
  Box,
  Collapse,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

import {
  LOGGED_IN_USER_MENU_PAGES,
  NOT_LOGGED_IN_USER_MENU_PAGES,
} from "../../config";
import { SearchBar } from "../SearchBar/SearchBar";
import { setSearchToggle } from "../../../store/searchToggle/searchToggleSlice";
import { CartData } from "../../interfaces/cart.interface";

const getCartItemNumber = (data: CartData) => {
  let amount = 0;
  for (const key in data) {
    amount = amount + data[key].amount;
  }

  return amount;
};

const NavBar = () => {
  const authData = useSelector((state: RootState) => state.userAuth);
  const cartData = useSelector((state: RootState) => state.cartData);

  const isSearchOpen = useSelector(
    (state: RootState) => state.searchToggle.isSearchOpen
  );
  const dispatch: AppDispatch = useDispatch();

  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const itemsInCart = useMemo(() => getCartItemNumber(cartData), [cartData]);
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
            {!isSearchOpen ? (
              <IconButton
                color="default"
                aria-label="search"
                onClick={() => {
                  dispatch(setSearchToggle());
                }}
              >
                <SearchIcon />
              </IconButton>
            ) : (
              <IconButton
                color="default"
                aria-label="search"
                onClick={() => {
                  dispatch(setSearchToggle());
                }}
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
            <Box>
              <Link to="/cart">
                <IconButton>
                  <Badge badgeContent={itemsInCart} color="error">
                    <ShoppingCartIcon />
                  </Badge>
                </IconButton>
              </Link>
            </Box>
          </Toolbar>
        </Box>
      </AppBar>
      {!authData.isLoggedIn && (
        <Typography variant={"caption"} gutterBottom color={"text.secondary"}>
          You are not logged in: <Link to={"/register"}>register</Link> or{" "}
          <Link to={"/login"}>log in</Link>
        </Typography>
      )}
      <Collapse in={isSearchOpen}>
        <Box marginTop={2}>
          <Toolbar>
            <IconButton
              onClick={() => {
                dispatch(setSearchToggle());
              }}
            >
              <ArrowBackIcon />
            </IconButton>
            <SearchBar />
          </Toolbar>
        </Box>
      </Collapse>
    </>
  );
};

export default NavBar;
