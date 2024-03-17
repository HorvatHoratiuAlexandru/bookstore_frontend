import { createBrowserRouter, Outlet } from "react-router-dom";
import NavBar from "../common/components/NavBar";
import RegisterPage from "../pages/auth/register";
import LogInPage from "../pages/auth/login";

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
