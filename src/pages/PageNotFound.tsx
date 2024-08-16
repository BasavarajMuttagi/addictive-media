const PageNotFound = () => {
  return (
    <div className="bg-gradient-to-r from-black to-violet-900 min-h-screen flex justify-between items-center text-center sm:text-start sm:flex-col sm:justify-center sm:items-center">
      <div className="text-white space-y-1">
        <div className="font-bold text-stone-100 text-3xl md:text-4xl lg:text-5xl">
          These are uncharted waters
        </div>
        <div className="text-lg text-pink-400">
          Sorry, that page can't be found.
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;
