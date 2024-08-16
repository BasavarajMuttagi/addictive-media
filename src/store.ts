import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const storageModule = {
  name: "addictive-media-storage",
  storage: createJSONStorage(() => sessionStorage),
};

type store = {
  token: string;
  displayName: string;
  email: string;
  phone: string;
  setToken: (newToken: string) => void;
  setDisplayName: (name: string) => void;
  setEmail: (email: string) => void;
  setPhone: (phone: string) => void;
  logout: () => void;
  reset: () => void;
};

const useAddictiveStore = create<store>()(
  persist(
    (set) => ({
      token: "",
      displayName: "",
      email: "",
      phone: "",
      setToken: (newToken) => set(() => ({ token: newToken })),
      setDisplayName: (name: string) => set(() => ({ displayName: name })),
      setEmail: (email: string) => set(() => ({ email })),
      setPhone: (phone: string) => set(() => ({ phone })),
      logout: () => {
        set(() => ({
          token: "",
          displayName: "",
          email: "",
        }));
      },
      reset: () => {
        set(() => ({
          token: "",
          displayName: "",
          email: "",
        }));
      },
    }),
    storageModule,
  ),
);
export default useAddictiveStore;
