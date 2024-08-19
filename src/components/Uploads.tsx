import { VideoCamera } from "@phosphor-icons/react";
import VideoCardWithDescription from "./VideoCardWithDescription";
import { createPortal } from "react-dom";
import { Fragment, useEffect, useState } from "react";
import UploadForm from "./UploadForm";
import apiClient from "../axios/apiClient";
import { VideoType } from "../types";
import VideoCardWithDescriptionSK from "../skeletons/VideoCardWithDescriptionSK";

const Uploads = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showUploadPopUp, setShowUploadPopUp] = useState(false);
  const [videos, setVideos] = useState<VideoType[]>([]);
  const getAllVideos = async () => {
    try {
      setIsLoading(true);
      const result = await apiClient.get("/video/getVideos");
      setVideos(result.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const refetchVideos = () => {
    getAllVideos();
  };
  useEffect(() => {
    getAllVideos();
  }, []);

  if (isLoading) {
    return (
      <div className="space-y-2 p-5  border-t border-neutral-700">
        <div className="flex items-start justify-between">
          <div className="text-xl text-gray-400 font-bold mb-10">
            Your Uploads
          </div>

          <button
            onClick={() => setShowUploadPopUp((prev) => !prev)}
            className="flex items-center space-x-2 py-2 px-4 rounded-full text-gray-100 bg-violet-600"
          >
            <span>Upload</span> <VideoCamera size={32} />
          </button>
        </div>

        <div className="space-y-2">
          {[...Array(10)].map(() => (
            <VideoCardWithDescriptionSK />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-2 p-5  border-t border-neutral-700">
      <div className="flex items-start justify-between">
        <div className="text-xl text-gray-400 font-bold mb-10">
          Your Uploads
        </div>

        <button
          onClick={() => setShowUploadPopUp((prev) => !prev)}
          className="flex items-center space-x-2 py-2 px-4 rounded-full text-gray-100 bg-violet-600"
        >
          <span>Upload</span> <VideoCamera size={32} />
        </button>
      </div>

      {!isLoading &&
        (videos.length > 0 ? (
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
        ))}

      {showUploadPopUp &&
        createPortal(
          <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 p-3">
            <UploadForm
              closeDialog={setShowUploadPopUp}
              refetch={refetchVideos}
            />
          </div>,
          document.body,
        )}
    </div>
  );
};

export default Uploads;
