import { createBrowserRouter, Outlet } from "react-router-dom";
import NavBar from "../common/components/Navigation/NavBar";
import RegisterPage from "../pages/auth/Register";
import LogInPage from "../pages/auth/Login";
import HomePage from "../pages/home/Home";
import SearchPage from "../pages/search/Search";
import { Container } from "@mui/material";

const Router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div>
        <Container>
          <NavBar />
          <Outlet />
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
        path: "search",
        element: <SearchPage />,
      },
    ],
  },
]);

export default Router;
