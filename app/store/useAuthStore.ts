import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  token: string | null;
  setToken: (token: string) => void;
  clearToken: () => void;
}

const FIVE_DAYS = 5 * 24 * 60 * 60 * 1000; // 5 days in ms

export const useAuthStore = create<AuthState>()(
  persist(
    (set, _get) => ({
      token: null,

      // Save token and expiry
      setToken: (token) => {
        const expiry = Date.now() + FIVE_DAYS;
        set({ token });
        localStorage.setItem("auth-expiry", expiry.toString());
      },

      // Clear token and expiry
      clearToken: () => {
        set({ token: null });
        localStorage.removeItem("auth-expiry");
      },
    }),
    {
      name: "auth-storage",
      storage: {
        getItem: (name) => {
          const expiry = localStorage.getItem("auth-expiry");

          // If expired, clear storage
          if (expiry && Date.now() > Number(expiry)) {
            localStorage.removeItem(name);
            localStorage.removeItem("auth-expiry");
            return null;
          }

          const value = localStorage.getItem(name);
          return value ? JSON.parse(value) : null;
        },

        setItem: (name, value) => {
          localStorage.setItem(name, JSON.stringify(value));
        },

        removeItem: (name) => {
          localStorage.removeItem(name);
        },
      },
    }
  )
);


