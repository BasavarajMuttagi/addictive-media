import { ReactNode } from "react";
import Navbar from "../components/Navbar";

const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div
      className="min-h-screen flex flex-col overflow-y-auto"
      style={{ scrollbarWidth: "thin" }}
    >
      <Navbar />
      <div className="flex-1 bg-neutral-900">{children}</div>
    </div>
  );
};

export default MainLayout;
