import { VideoCamera } from "@phosphor-icons/react";
import VideoCardWithDescription from "./VideoCardWithDescription";
import { createPortal } from "react-dom";
import UploadVideo from "./UploadVideo";
import { useState } from "react";

const Uploads = () => {
  const [showUploadPopUp, setShowUploadPopUp] = useState(false);
  const data = [...Array(0)];
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
      {data.length > 0 ? (
        <div className="space-y-2">
          {data.map(() => (
            <>
              <VideoCardWithDescription />
              <div className="border-b border-neutral-600/30"></div>
            </>
          ))}
        </div>
      ) : (
        <div className="text-center text-xl text-gray-400 font-medium">
          No Videos
        </div>
      )}

      {showUploadPopUp &&
        createPortal(
          <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 p-3">
            <UploadVideo closeDialog={setShowUploadPopUp} />
          </div>,
          document.body,
        )}
    </div>
  );
};

export default Uploads;
