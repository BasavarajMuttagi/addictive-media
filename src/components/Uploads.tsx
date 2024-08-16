import VideoCardWithDescription from "./VideoCardWithDescription";

const Uploads = () => {
  const data = [...Array(0)];
  return (
    <div className="space-y-2 p-5  border-t border-neutral-700">
      <div className="text-xl text-gray-400 font-bold mb-10">Your Uploads</div>
      {data.length > 0 ? (
        <div className="space-y-2">
          {data.map(() => (
            <>
              <VideoCardWithDescription />
              <div className="border-b border-neutral-600/30"></div>
            </>
          ))}
        </div>
      ) : (
        <div className="text-center text-xl text-gray-500 font-medium">
          No Videos
        </div>
      )}
    </div>
  );
};

export default Uploads;
