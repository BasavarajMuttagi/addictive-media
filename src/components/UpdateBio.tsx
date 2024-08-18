import { zodResolver } from "@hookform/resolvers/zod";
import { CircleNotch, X } from "@phosphor-icons/react";
import { Dispatch, SetStateAction, useState } from "react";
import { useForm } from "react-hook-form";
import { bioType, bioSchema } from "../zod/schema";
import { isAxiosError } from "axios";
import toast from "react-hot-toast";
import apiClient from "../axios/apiClient";

const UpdateBio = ({
  refetchProfile,
  closeDialog,
  bio,
}: {
  refetchProfile: () => void;
  closeDialog: Dispatch<SetStateAction<boolean>>;
  bio: string;
}) => {
  const [isSpin, setIsSpin] = useState(false);
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<bioType>({
    resolver: zodResolver(bioSchema),
    defaultValues: {
      bio,
    },
  });

  const submit = async (data: bioType) => {
    try {
      setIsSpin(true);
      await apiClient.post("/auth/bio/update", data);
      refetchProfile();
      reset();
      closeDialog(false);
    } catch (error) {
      if (isAxiosError(error)) {
        return toast.error(error.response?.data.message);
      }
      return toast.error("Something went wrong");
    } finally {
      setIsSpin(false);
    }
  };
  return (
    <form
      className="text-white/50 max-w-lg w-full bg-neutral-800 space-y-10 rounded-md flex flex-col justify-between p-4 border-2 border-neutral-700/30"
      onSubmit={handleSubmit(submit)}
    >
      <div className="flex justify-end">
        <div
          className="p-1 rounded-full bg-zinc-100 cursor-pointer"
          onClick={() => closeDialog((prev) => !prev)}
        >
          <X size={16} className="text-black" />
        </div>
      </div>

      <div className="relative">
        <textarea
          {...register("bio")}
          placeholder="Bio"
          className="outline-none p-2 rounded-md bg-neutral-800 w-full h-32 border-2 border-neutral-700"
        />
        {errors.bio && (
          <p className="text-red-400 text-xs absolute -bottom-3">
            {errors.bio.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        className="p-2 w-full text-white bg-violet-500 rounded-md space-x-2 flex items-center justify-center"
      >
        <span className="font-medium">Update</span>
        {isSpin && (
          <>
            <CircleNotch size={20} className="animate-spin" />
          </>
        )}
      </button>
    </form>
  );
};

export default UpdateBio;
