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
      setAccessToken: (accessToken, expiresInTime) => {
        const expiresAt = Date.now() + expiresInTime * 1000; 
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("expiresAt", expiresAt);
        set({ accessToken, expiresInTime });
      },

      setExpiresInTime: (expiresInTime) => {
        if (expiresInTime <= 0) {
          set({ expiresInTime: 0 });
        } else {
          set({ expiresInTime });
        }
      },
      logout: () => {
        set({ user: null, accessToken: null, expiresInTime: null });
        localStorage.removeItem("accessToken");
        localStorage.removeItem("expiresAt"); 
      },
      restoreSession: () => {
        const expiresAt = Number(localStorage.getItem("expiresAt"));
        if (expiresAt) {
          const remainingTime = Math.max(0, Math.floor((expiresAt - Date.now()) / 1000));
          set({ expiresInTime: remainingTime });
        }
      },
    })),
    {
      name: "user",
    }
  )
);

export default useAuthStore;
