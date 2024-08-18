import useAddictiveStore from "../store";

const Navbar = () => {
  const { logout } = useAddictiveStore();
  return (
    <nav className="bg-neutral-950 p-3 flex items-center justify-between">
      <div className="font-extrabold text-3xl text-pink-500  whitespace-nowrap">
        Addictive Media
      </div>

      <button
        className="px-3 py-2 rounded-md bg-blue-500 text-white"
        onClick={() => logout()}
      >
        Logout
      </button>
    </nav>
  );
};

export default Navbar;
