import { VideoType } from "../types";

const VideoCardWithTitle = ({ folder, title }: VideoType) => {
  const URL = `${import.meta.env.VITE_CLOUDFRONT_BASE_URL}/${folder}`;
  return (
    <div className=" bg-neutral-800 rounded-md text-white/50 p-2 space-y-2 cursor-pointer border-2 border-neutral-700/40">
      <video className="rounded-md w-96 cursor-pointer" controls>
        <source src={URL} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <p>{title}</p>
    </div>
  );
};

export default VideoCardWithTitle;
