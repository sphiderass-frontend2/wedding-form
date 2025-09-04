// store/useUserStore.ts
"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserState {
  fullName: string | null;
  setFullName: (name: string) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      fullName: null,

      setFullName: (name) => set({ fullName: name }),

      clearUser: () => set({ fullName: null }),
    }),
    {
      name: "user-storage",
    }
  )
);
