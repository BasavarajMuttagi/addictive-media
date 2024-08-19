import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const ProfileSK = () => {
  return (
    <SkeletonTheme baseColor="#202020" highlightColor="#444">
      <div className="text-gray-300 p-5 font-medium relative">
        <div className="flex flex-col space-y-5">
          <Skeleton className="aspect-square h-24 w-24 rounded-full  border-2 border-gray-600"></Skeleton>

          <div>
            <Skeleton className="h-6 w-3/4   rounded mt-2"></Skeleton>

            <Skeleton className="h-4 w-1/2   rounded mt-2"></Skeleton>

            <div className="mt-4">
              <Skeleton className="h-4 w-3/4   rounded mt-2"></Skeleton>
              <Skeleton className="h-4 w-1/2   rounded mt-2"></Skeleton>
            </div>
          </div>
        </div>
      </div>
    </SkeletonTheme>
  );
};

export default ProfileSK;
