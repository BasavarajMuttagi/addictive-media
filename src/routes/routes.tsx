import { createBrowserRouter } from "react-router-dom";
import PageNotFound from "../pages/PageNotFound";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <></>,
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
]);

export default routes;
