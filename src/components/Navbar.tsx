const Navbar = () => {
  return (
    <nav className="bg-neutral-950 p-3 flex items-center justify-between">
      <div className="font-extrabold text-3xl text-pink-500  whitespace-nowrap">
        Addictive Media
      </div>

      <img
        src="https://ukmars.org/ukmars/wp-content/uploads/2020/07/pexels-photo-4709374.jpeg"
        alt="profile"
        className="aspect-square h-10 w-10 rounded-full border-2 border-green-500 shrink-0"
      />
    </nav>
  );
};

export default Navbar;
