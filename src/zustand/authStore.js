import { create } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

const useAuthStore = create(
  persist(
    immer((set) => ({
      user: null,
      accessToken: null,
      expiresInTime: null,
      setUser: (user) => set({ user }),
      setAccessToken: (accessToken) => set({ accessToken }),
      setExpiresInTime: (expiresInTime) => set({ expiresInTime }),
      logout: () => {
        set({ user: null, accessToken: null, expiresInTime: null });
        localStorage.removeItem("accessToken");
      },
    })),
    {
      name: "user",
    }
  )
);

export default useAuthStore;
