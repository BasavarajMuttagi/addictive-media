import { VideoType } from "../types";

const VideoCardWithTitle = ({ folder }: VideoType) => {
  const URL = `${import.meta.env.VITE_CLOUDFRONT_BASE_URL}/${folder}`;
  return (
    <video className="rounded-md w-96 cursor-pointer">
      <source src={URL} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
};

export default VideoCardWithTitle;
