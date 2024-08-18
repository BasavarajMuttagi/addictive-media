import { createBrowserRouter } from "react-router-dom";
import PageNotFound from "../pages/PageNotFound";
import AuthLayout from "../layouts/AuthLayout";
import Public from "./Public";
import SignUp from "../components/SignUp";
import Login from "../components/Login";
import Private from "./Private";
import MainLayout from "../layouts/MainLayout";
import User from "../pages/User";

const routes = createBrowserRouter([
  {
    element: (
      <AuthLayout>
        <Public />
      </AuthLayout>
    ),
    children: [
      {
        path: "/signup",
        element: <SignUp />,
      },
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
  {
    element: (
      <MainLayout>
        <Private />
      </MainLayout>
    ),
    children: [
      {
        path: "/profile",
        element: <User />,
      },
    ],
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
]);

export default routes;
