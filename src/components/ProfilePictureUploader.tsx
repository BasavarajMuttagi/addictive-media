import { CircleNotch, UploadSimple, X } from "@phosphor-icons/react";
import { Dispatch, SetStateAction, useRef, useState } from "react";
import apiClient from "../axios/apiClient";
import toast from "react-hot-toast";
import { twMerge } from "tailwind-merge";
import axios, { isAxiosError } from "axios";
import { poll } from "../axios/common";

const ProfilePictureUploader = ({
  refetchProfile,
  closeDialog,
}: {
  refetchProfile: () => void;
  closeDialog: Dispatch<SetStateAction<boolean>>;
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>();
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const Clear = () => {
    setSelectedFile(null);
    if (fileInputRef && fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleImageSelection = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const image = new Image();
      image.src = URL.createObjectURL(file);

      image.onload = () => {
        if (image.width === 500 && image.height === 500) {
          setSelectedFile(file);
        } else {
          toast.error("Image must be 500x500 pixels");
          Clear();
        }
      };
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      toast.error("Please select a file");
      return;
    }
    try {
      setIsUploading(true);
      const result = await apiClient.post("/auth/getPresignedUrl", {
        fileName: selectedFile.name,
        fileType: selectedFile.type,
        fileSize: selectedFile.size,
      });
      const { url } = result.data as { url: string };
      await axios.put(url, selectedFile, {
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(progressEvent.progress! * 100);
          setUploadProgress(percentCompleted);
        },
      });

      await poll(2000, 10, "image", {
        filename: selectedFile.name,
        filesize: selectedFile.size,
      });
      refetchProfile();
      closeDialog(false);
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error(error.response?.data.message);
        return;
      }
      return toast.error("Something Went Wrong");
    } finally {
      setIsUploading(false);
    }
  };
  return (
    <div className="max-w-lg w-full bg-neutral-800 h-96 rounded-md flex flex-col justify-between p-4 border-2 border-neutral-700/30">
      <div className="flex justify-end">
        <div
          className="p-1 rounded-full bg-zinc-100 cursor-pointer"
          onClick={() => closeDialog((prev) => !prev)}
        >
          <X size={16} className="text-black" />
        </div>
      </div>
      <div className="flex flex-col items-center justify-center space-y-5">
        {!selectedFile && (
          <>
            <label htmlFor="fileUpload" className="space-y-5 cursor-pointer">
              <UploadSimple
                size={50}
                weight="duotone"
                className="mx-auto fill-green-400"
              />
              <div className="px-5 py-2 font-medium rounded-full bg-zinc-100 text-zinc-900 hover:bg-zinc-300">
                select image file
              </div>
              <input
                ref={fileInputRef}
                type="file"
                id="fileUpload"
                className="hidden"
                accept=".jpg"
                multiple={false}
                onChange={handleImageSelection}
              />
            </label>
            <p className="text-xs text-neutral-500">
              supported video formats .jpg
            </p>
          </>
        )}
        {selectedFile && (
          <div className="space-y-5">
            {isUploading ? (
              <div className="w-fit mx-auto">
                <CircleNotch
                  size={50}
                  weight="duotone"
                  className="fill-blue-400 animate-spin"
                />
                <p className="text-green-300 text-center">{uploadProgress}%</p>
              </div>
            ) : (
              <UploadSimple
                size={50}
                weight="duotone"
                className="mx-auto fill-green-400"
              />
            )}
            <p className="text-white overflow-hidden text-sm">
              {selectedFile?.name}
            </p>
          </div>
        )}
      </div>
      <div className="flex items-center justify-between">
        <button
          disabled={!selectedFile || isUploading}
          className={twMerge(
            "px-3 py-1 rounded-md bg-violet-500 text-white",
            isUploading || !selectedFile ? "brightness-50" : "",
          )}
          onClick={Clear}
        >
          Clear
        </button>
        <button
          disabled={!selectedFile || isUploading}
          onClick={() => handleUpload()}
          className={twMerge(
            "px-3 py-1 rounded-md bg-green-500 text-white",
            !selectedFile || isUploading ? "brightness-50" : "",
          )}
        >
          Upload
        </button>
      </div>
    </div>
  );
};

export default ProfilePictureUploader;
