import { createBrowserRouter } from "react-router-dom";
import PageNotFound from "../pages/PageNotFound";
import AuthLayout from "../layouts/AuthLayout";
import Public from "./Public";
import SignUp from "../components/SignUp";
import Login from "../components/Login";
import Private from "./Private";
import MainLayout from "../layouts/MainLayout";
import User from "../pages/User";
import Home from "../pages/Home";
import ShowVideosById from "../components/ShowVideosById";

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
        path: "/",
        element: <Home />,
      },
      {
        path: "/profile",
        element: <User />,
      },

      {
        path: "/:userId/:name",
        element: <ShowVideosById />,
      },
    ],
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
]);

export default routes;
