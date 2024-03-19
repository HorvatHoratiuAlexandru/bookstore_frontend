import { createBrowserRouter, Outlet } from "react-router-dom";
import NavBar from "../common/components/Navigation/NavBar";
import RegisterPage from "../pages/auth/register";
import LogInPage from "../pages/auth/login";
import HomePage from "../pages/home/Home";

const Router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div>
        <NavBar />
        <Outlet />
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
    ],
  },
]);

export default Router;
