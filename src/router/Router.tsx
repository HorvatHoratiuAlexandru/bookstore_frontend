import { createBrowserRouter, Outlet } from "react-router-dom";
import NavBar from "../common/components/Navigation/NavBar";
import RegisterPage from "../pages/auth/Register";
import LogInPage from "../pages/auth/Login";
import HomePage from "../pages/home/Home";
import { Box, Container } from "@mui/material";
import BookPage from "../pages/book/Book";

const Router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div>
        <Container>
          <Box bgcolor={"#EEEEEE"} padding={1}>
            <NavBar />
            <Outlet />
          </Box>
        </Container>
      </div>
    ),
    children: [
      {
        index: true,
        path: "/",
        element: <HomePage />,
      },
      {
        path: "register",
        element: <RegisterPage />,
      },
      {
        path: "login",
        element: <LogInPage />,
      },
      {
        path: "book/:bookId",
        element: <BookPage />,
      },
    ],
  },
]);

export default Router;
