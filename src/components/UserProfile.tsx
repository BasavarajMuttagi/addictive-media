import { EnvelopeSimple, Phone } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import ProfilePictureUploader from "./ProfilePictureUploader";
import UpdateBio from "./UpdateBio";
import apiClient from "../axios/apiClient";
import { Profile } from "../types";
import ProfileSK from "../skeletons/ProfileSK";
export const defaultAvatar = "https://avatar.iran.liara.run/public/35";
const UserProfile = () => {
  const [showUploadPopUp, setShowUploadPopUp] = useState(false);
  const [showBioPopUp, setShowBioPopUp] = useState(false);
  const [profile, setProfile] = useState<Profile>();
  const [isLoading, setIsLoading] = useState(false);
  const getProfile = async () => {
    try {
      setIsLoading(true);
      const result = await apiClient.get("/auth/getProfile");
      setProfile(result.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const refetchProfile = () => {
    getProfile();
  };
  useEffect(() => {
    getProfile();
  }, []);

  if (isLoading) {
    return <ProfileSK />;
  }

  const URL = `${import.meta.env.VITE_CLOUDFRONT_BASE_URL}/${profile?.photoUrl}`;
  return (
    <>
      <div className="text-gray-300 bg-neutral-900 p-5 font-medium relative">
        <div className="flex flex-col  space-y-5">
          <img
            src={profile?.photoUrl ? URL : defaultAvatar}
            alt="profile"
            className="aspect-square h-24 w-24 rounded-full border-2 border-green-500 cursor-pointer"
            onClick={() => setShowUploadPopUp((prev) => !prev)}
          />
          <div>
            <div className="text-2xl font-bold tracking-wide">
              {`${profile?.firstname} ${profile?.lastname}`}
            </div>
            <div className="flex items-center space-x-2">
              <EnvelopeSimple weight="bold" size={20} />
              <span>{profile?.email}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Phone size={20} weight="bold" />
              <span>{profile?.phone}</span>
            </div>
            <div className="mt-4">
              <span
                className="text-blue-500 cursor-pointer"
                onClick={() => setShowBioPopUp((prev) => !prev)}
              >
                {profile?.bio ?? (
                  <p>
                    Add Your Bio, Tell us more about yourself to complete your
                    profile.
                  </p>
                )}
              </span>
            </div>
          </div>
        </div>
      </div>
      {showUploadPopUp &&
        createPortal(
          <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 p-3">
            <ProfilePictureUploader
              closeDialog={setShowUploadPopUp}
              refetchProfile={refetchProfile}
            />
          </div>,
          document.body,
        )}

      {showBioPopUp &&
        createPortal(
          <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 p-3">
            <UpdateBio
              closeDialog={setShowBioPopUp}
              refetchProfile={refetchProfile}
              bio={profile?.bio || ""}
            />
          </div>,
          document.body,
        )}
    </>
  );
};

export default UserProfile;
