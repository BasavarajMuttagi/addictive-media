import { useState, useEffect, Fragment } from "react";
import apiClient from "../axios/apiClient";
import { VideoType } from "../types";
import { useParams } from "react-router-dom";
import VideoCardWithDescription from "./VideoCardWithDescription";

const ShowVideosById = () => {
  const { userId } = useParams();
  const [videos, setVideos] = useState<VideoType[]>([]);

  useEffect(() => {
    const getVideoListWithUser = async () => {
      const result = await apiClient.get(`/video/getVideosByID/${userId}`);
      setVideos(result.data);
    };
    getVideoListWithUser();
  }, [userId]);

  return (
    <div className="w-full p-2">
      <div className="text-xl text-gray-400 font-bold mb-10 p-2">
        All Videos
      </div>
      {videos.length > 0 ? (
        <div className="space-y-2">
          {videos.map((eachVideo) => (
            <Fragment key={eachVideo._id}>
              <VideoCardWithDescription {...eachVideo} />
              <div className="border-b border-neutral-600/30"></div>
            </Fragment>
          ))}
        </div>
      ) : (
        <div className="text-center text-xl text-gray-400 font-medium">
          No Videos
        </div>
      )}
    </div>
  );
};

export default ShowVideosById;
