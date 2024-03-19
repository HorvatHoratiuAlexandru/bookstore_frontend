import {
  Container,
  Grid,
  Box,
  Typography,
  Checkbox,
  FormControlLabel,
  CircularProgress,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Paper,
  Pagination,
  Menu,
  MenuItem,
  IconButton,
} from "@mui/material";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useGetBooksQuery } from "../../store/api/bookapi/book.api";
import { BACKEND_BASE_URL, TAGS_LIST } from "../../common/config";
import { bookData } from "../../common/interfaces/responses/book.res.interface";
import { AddShoppingCart } from "@mui/icons-material";

const options = [
  "None",
  "Atria",
  "Callisto",
  "Dione",
  "Ganymede",
  "Hangouts Call",
  "Luna",
  "Oberon",
  "Phobos",
  "Pyxis",
  "Sedna",
  "Titania",
  "Triton",
  "Umbriel",
];

const HomePage = () => {
  return <div>Home</div>;
};

export default HomePage;
