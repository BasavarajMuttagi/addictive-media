import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const storageModule = {
  name: "addictive-media-storage",
  storage: createJSONStorage(() => sessionStorage),
};

type user = {
  displayName: string;
  email: string;
  phone: string;
  photoUrl: string;
  bio: string;
};
type store = {
  token: string;
  user: user;
  setToken: (newToken: string) => void;
  setUser: (newUser: user) => void;
  logout: () => void;
};

const userInitialState = {
  displayName: "",
  email: "",
  phone: "",
  photoUrl: "",
  bio: "",
};
const useAddictiveStore = create<store>()(
  persist(
    (set) => ({
      token: "",
      user: userInitialState,
      setToken: (newToken) => set(() => ({ token: newToken })),
      setUser: (newUser) => set(() => ({ user: newUser })),
      logout: () => {
        set(() => ({
          token: "",
          user: userInitialState,
        }));
      },
    }),
    storageModule,
  ),
);
export default useAddictiveStore;
