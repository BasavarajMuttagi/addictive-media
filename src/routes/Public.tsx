import { Navigate, Outlet } from "react-router-dom";

import useAddictiveStore from "../store";
import { jwtDecode } from "jwt-decode";
import { tokenType } from "./Private";
import toast from "react-hot-toast";

const Public = () => {
  const token = useAddictiveStore((e) => e.token);

  if (token) {
    try {
      const decoded = jwtDecode(token) as tokenType;
      const expirationTime = new Date(decoded.exp * 1000);
      const currentTime = new Date();

      if (currentTime < expirationTime) {
        return <Navigate to={"/"} />;
      }
    } catch (error) {
      console.log(error);
      toast.error("Invalid token");
    }
  }

  return <Outlet />;
};

export default Public;
