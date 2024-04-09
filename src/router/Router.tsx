import { createBrowserRouter, Outlet } from "react-router-dom";
import NavBar from "../common/components/Navigation/NavBar";
import RegisterPage from "../pages/auth/Register";
import LogInPage from "../pages/auth/Login";
import HomePage from "../pages/home/Home";
import { Container } from "@mui/material";
import BookPage from "../pages/book/Book";
import ShoppingCart from "../pages/shop/ShoppingCart";
import Orders from "../pages/orders/Orders";
import OrderDetail from "../pages/orders/OrderDetail";

const Router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Container
        maxWidth={"lg"}
        sx={{ height: "100vh", overflow: "scroll", backgroundColor: "#EEEEEE" }}
      >
        <NavBar />
        <Outlet />
      </Container>
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
      {
        path: "cart",
        element: <ShoppingCart />,
      },
      {
        path: "order/:orderId",
        element: <OrderDetail />,
      },
      {
        path: "order",
        element: <Orders />,
      },
    ],
  },
]);

export default Router;
