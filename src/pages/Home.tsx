import { Link } from "react-router-dom";
import VideoCardWithTitle from "../components/VideoCardWithTitle";
import HomeSK from "../skeletons/HomeSK";
import { useState, useEffect } from "react";
import apiClient from "../axios/apiClient";
import { defaultAvatar } from "../components/UserProfile";
import { VideoGroup } from "../types";

const Home = () => {
  const [videos, setVideos] = useState<VideoGroup[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const getVideoListWithUser = async () => {
    try {
      setIsLoading(true);
      const result = await apiClient.get("/video/getVideoListWithUser");
      setVideos(result.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getVideoListWithUser();
  }, []);

  if (isLoading) {
    return <HomeSK />;
  }

  return (
    <div className="p-5 w-full">
      <div className="space-y-10">
        {videos.map((eachGroup) => {
          const URL = `${import.meta.env.VITE_CLOUDFRONT_BASE_URL}/${eachGroup.user.photoUrl}`;
          return (
            <div key={eachGroup.user._id} className="space-y-5">
              <div className="flex items-center space-x-2">
                <img
                  src={eachGroup.user.photoUrl ? URL : defaultAvatar}
                  alt="profile"
                  className="aspect-square h-12 w-12 rounded-full border-2 border-neutral-700 cursor-pointer"
                />
                <div className="inline-flex items-baseline space-x-3">
                  <div className="text-lg font-bold tracking-wide text-gray-500">
                    {`${eachGroup.user.firstname} ${eachGroup.user.lastname}`}
                  </div>
                  <div className="text-neutral-400">|</div>
                  <div className="text-blue-500 font-medium cursor-pointer">
                    <Link
                      to={`${eachGroup.user._id}/${eachGroup.user.firstname}${eachGroup.user.lastname}`}
                    >
                      view all
                    </Link>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-10 overflow-x-auto">
                {eachGroup.videos.map((eachVideo) => (
                  <VideoCardWithTitle key={eachVideo._id} {...eachVideo} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
