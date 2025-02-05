import { Navigate, Outlet } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import useAddictiveStore from "../store";

export type tokenType = {
  userId: string;
  email: string;
  name: string;
  iat: number;
  exp: number;
};
function Private() {
  const token = useAddictiveStore((e) => e.token);
  const setToken = useAddictiveStore((e) => e.setToken);

  if (!token) {
    return <Navigate to={"/login"} />;
  }

  const decoded = jwtDecode(token) as tokenType;

  const expirationTime = new Date(decoded.exp * 1000);
  const currentTime = new Date();

  if (currentTime > expirationTime) {
    setToken("");
    return <Navigate to={"/login"} />;
  }

  return <Outlet />;
}

export default Private;
