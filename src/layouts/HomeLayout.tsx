import { ReactNode } from "react";
import UserProfile from "../components/UserProfile";

const HomeLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div
      className="min-h-screen flex flex-col overflow-y-auto"
      style={{ scrollbarWidth: "thin" }}
    >
      <UserProfile />
      <div className="flex-1">{children}</div>
    </div>
  );
};

export default HomeLayout;
