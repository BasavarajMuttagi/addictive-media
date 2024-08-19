import { VideoType } from "../types";

const VideoCardWithDescription = ({
  folder,
  description,
  title,
}: VideoType) => {
  const URL = `${import.meta.env.VITE_CLOUDFRONT_BASE_URL}/${folder}`;
  return (
    <div className="flex items-center space-x-4 p-1 cursor-pointer">
      <video className="aspect-video h-[100px] rounded-md">
        <source src={URL} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="space-y-2 text-white/60">
        <div className="font-medium">{title}</div>
        <div className="text-white/40 text-sm font-normal">{description}</div>
      </div>
    </div>
  );
};

export default VideoCardWithDescription;
