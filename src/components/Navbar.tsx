import { Link, NavLink } from "react-router-dom";
import useAddictiveStore from "../store";
import { ArrowUpRight } from "@phosphor-icons/react";

const Navbar = () => {
  const { logout } = useAddictiveStore();
  return (
    <nav className="bg-neutral-950 p-3 flex items-center justify-between">
      <Link to={"/"}>
        <div className="font-extrabold text-3xl text-pink-500  whitespace-nowrap">
          Addictive Media
        </div>
      </Link>

      <div className="flex items-center space-x-8 text-white">
        <div className="inline-flex items-center font-medium space-x-1 has-[a.active]:text-blue-500">
          <NavLink to={"/profile"}>Profile</NavLink>
          <ArrowUpRight size={20} />
        </div>
        <button
          className="px-3 py-2 rounded-md bg-blue-500"
          onClick={() => logout()}
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
