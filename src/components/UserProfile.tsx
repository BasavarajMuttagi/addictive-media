import { EnvelopeSimple, PencilSimple, Phone } from "@phosphor-icons/react";
import useAddictiveStore from "../store";

const UserProfile = () => {
  const { displayName, email, phone } = useAddictiveStore();
  return (
    <div className="text-gray-300 bg-neutral-900 p-5 font-medium relative">
      <div className="flex flex-col  space-y-5">
        <img
          src="https://ukmars.org/ukmars/wp-content/uploads/2020/07/pexels-photo-4709374.jpeg"
          alt="profile"
          className="aspect-square h-24 w-24 rounded-full border-2 border-green-500"
        />
        <div>
          <div className="text-2xl font-bold tracking-wide">{displayName}</div>
          <div className="flex items-center space-x-2">
            <EnvelopeSimple weight="bold" size={20} />
            <span>{email}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Phone size={20} weight="bold" />
            <span>{phone}</span>
          </div>
          <div className="mt-4">
            <span className="text-blue-500">
              Add Your Bio, Tell us more about yourself to complete your
              profile.
            </span>
          </div>
        </div>
      </div>
      <PencilSimple
        size={40}
        weight="bold"
        className="p-2 rounded-full bg-gray-300/30 text-white absolute top-4 right-4 cursor-pointer"
      />
    </div>
  );
};

export default UserProfile;
