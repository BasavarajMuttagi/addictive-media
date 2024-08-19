import { SkeletonTheme } from "react-loading-skeleton";

const ProfileSK = () => {
  return (
    <SkeletonTheme baseColor="#202020" highlightColor="#444">
      <div className="text-gray-300 bg-neutral-900 p-5 font-medium relative">
        <div className="flex flex-col space-y-5">
          <div className="aspect-square h-24 w-24 rounded-full bg-gray-700 animate-pulse border-2 border-gray-600"></div>

          <div>
            <div className="flex items-center space-x-2 mt-2">
              <div className="h-4 w-1/2 bg-gray-700 animate-pulse rounded"></div>
            </div>

            <div className="flex items-center space-x-2 mt-2">
              <div className="h-4 w-1/2 bg-gray-700 animate-pulse rounded"></div>
            </div>

            <div className="mt-4">
              <div className="h-4 w-1/2 bg-gray-700 animate-pulse rounded mt-2"></div>
            </div>
            <div className="mt-4">
              <div className="h-4 w-1/2 bg-gray-700 animate-pulse rounded mt-2"></div>
            </div>
          </div>
        </div>
      </div>
    </SkeletonTheme>
  );
};

export default ProfileSK;
