import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const HomeSK = () => {
  return (
    <SkeletonTheme baseColor="#202020" highlightColor="#444">
      <div className="p-5 w-full">
        <div className="space-y-10">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="space-y-5">
              <div className="flex items-center space-x-2">
                <Skeleton className="aspect-square h-12 w-12 rounded-full border-2"></Skeleton>
                <div className="inline-flex items-center space-x-3">
                  <Skeleton className="h-6 w-32   rounded"></Skeleton>
                  <div className="text-neutral-200">|</div>
                  <Skeleton className="h-6 w-20   rounded"></Skeleton>
                </div>
              </div>

              <div
                className="flex items-center space-x-10 overflow-x-auto"
                style={{ scrollbarWidth: "none" }}
              >
                {[...Array(5)].map((_, videoIndex) => (
                  <div
                    key={videoIndex}
                    className="flex flex-col items-center w-96"
                  >
                    <Skeleton className="h-48    rounded w-96"></Skeleton>
                    <Skeleton className="h-4 w-96   rounded mt-2"></Skeleton>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </SkeletonTheme>
  );
};

export default HomeSK;
