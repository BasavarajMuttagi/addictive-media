import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { FileUploadSchemaType, FileUploadSchema } from "../zod/schema";
import React, { useRef, useState } from "react";
import toast from "react-hot-toast";
import axios, { isAxiosError } from "axios";
import apiClient from "../axios/apiClient";
import { X, CircleNotch } from "@phosphor-icons/react";

const UploadForm = ({
  closeDialog,
}: {
  closeDialog: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<FileUploadSchemaType>({
    resolver: zodResolver(FileUploadSchema),
  });

  const handleFileSelection = (e: React.ChangeEvent<HTMLInputElement>) => {
    const MAX_VIDEO_SIZE = 6 * 1024 * 1024;
    if (e.target.files && e.target.files.length > 0) {
      if (e.target.files[0]["size"] > MAX_VIDEO_SIZE) {
        return toast.error("Video size exceeds the 6 MB limit");
      }
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUpload = async (data: FileUploadSchemaType) => {
    if (!selectedFile) {
      toast.error("Please select a file");
      return;
    }

    try {
      setIsUploading(true);
      const body = {
        ...data,
        fileName: selectedFile.name,
        fileType: selectedFile.type,
        fileSize: selectedFile.size,
      };
      const result = await apiClient.post("/video/getPresignedUrl", body);
      const { url } = result.data as { url: string };
      await axios.put(url, selectedFile, {
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(progressEvent.progress! * 100);
          setUploadProgress(percentCompleted);
          console.log(`Upload Progress: ${percentCompleted}%`);
        },
      });
      reset();
      clearSelection();
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

  const clearSelection = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  console.log(errors);
  return (
    <form
      className="text-white/50 max-w-lg w-full bg-neutral-800 space-y-10 rounded-md flex flex-col justify-between p-4 border-2 border-neutral-700/30"
      onSubmit={handleSubmit(handleUpload)}
    >
      <div className="flex justify-end">
        <div
          className="p-1 rounded-full bg-zinc-100/30 cursor-pointer"
          onClick={() => closeDialog((prev) => !prev)}
        >
          <X size={16} className="text-black" />
        </div>
      </div>
      <div className="relative">
        <input
          {...register("title")}
          type="text"
          placeholder="Title"
          className="outline-none p-2 rounded-md bg-neutral-800 w-full border-2 border-neutral-700"
        />
        {errors.title && (
          <p className="text-red-400 text-xs absolute -bottom-4">
            {errors.title.message}
          </p>
        )}
      </div>
      <div className="relative">
        <textarea
          {...register("description")}
          placeholder="Description"
          className="outline-none p-2 rounded-md bg-neutral-800 w-full h-32 border-2 border-neutral-700"
        />
        {errors.description && (
          <p className="text-red-400 text-xs absolute -bottom-3">
            {errors.description.message}
          </p>
        )}
      </div>
      <div>
        <label htmlFor="fileUpload" className="space-y-5 cursor-pointer">
          <div className="outline-none p-2 rounded-md bg-neutral-800 w-full border-2 border-neutral-700">
            {selectedFile ? (
              <span>{selectedFile.name}</span>
            ) : (
              <span>Select a file</span>
            )}
          </div>
          <input
            ref={fileInputRef}
            type="file"
            id="fileUpload"
            className="hidden"
            accept=".mp4"
            onChange={handleFileSelection}
          />
        </label>
      </div>
      <div className="flex items-center space-x-5">
        <button
          type="button"
          onClick={clearSelection}
          className="p-2 w-full text-white bg-blue-500 rounded-md space-x-2 flex items-center justify-center"
        >
          <span className="font-medium">Clear</span>
        </button>
        <button
          type="submit"
          className="p-2 w-full text-white bg-violet-500 rounded-md space-x-2 flex items-center justify-center"
        >
          {!isUploading && <span className="font-medium">Upload</span>}
          {isUploading && (
            <>
              <CircleNotch size={20} className="animate-spin" />
              {uploadProgress}%
            </>
          )}
        </button>
      </div>
    </form>
  );
};

export default UploadForm;
