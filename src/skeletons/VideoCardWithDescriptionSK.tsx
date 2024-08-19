import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const VideoCardWithDescriptionSK = () => {
  return (
    <>
      <SkeletonTheme baseColor="#202020" highlightColor="#444">
        <div className="flex items-center space-x-4 cursor-pointer rounded-md">
          <Skeleton
            className="aspect-video h-[100px] w-[180px] rounded-md"
            direction="ltr"
          ></Skeleton>
          <div>
            <Skeleton className="font-medium w-48"></Skeleton>
            <Skeleton className="text-white/40 text-sm font-normal w-96"></Skeleton>
          </div>
        </div>
        <div className="border-b border-neutral-600/30"></div>
      </SkeletonTheme>
    </>
  );
};

export default VideoCardWithDescriptionSK;
