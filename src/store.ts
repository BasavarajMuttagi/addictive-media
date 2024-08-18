import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const storageModule = {
  name: "addictive-media-storage",
  storage: createJSONStorage(() => sessionStorage),
};

type store = {
  token: string;
  setToken: (newToken: string) => void;
  logout: () => void;
};

const useAddictiveStore = create<store>()(
  persist(
    (set) => ({
      token: "",
      setToken: (newToken) => set(() => ({ token: newToken })),
      logout: () => {
        set(() => ({
          token: "",
        }));
      },
    }),
    storageModule,
  ),
);
export default useAddictiveStore;
