"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Guest {
  fullName: string;
  guestTitle: string;
  phoneNumber: string;
  emailAddress: string;
}

export interface FormData {
  name: string;
  description: string;
  category: string;
  numberOfAttendees: number;
  date: string;                // ISO date string e.g. "2025-10-10"
  startTime: string;           // "HH:mm"
  endTime: string;             // "HH:mm"
  venue: string;
  address: string;
  guestList: Guest[];
  rsvpStatus: "Open" | "Closed";
  invitationCard: string | File | null;
}

interface WeddingStore {
  formData: FormData;
  updateField: <K extends keyof FormData>(field: K, value: FormData[K]) => void;
  addGuest: (guest: Guest) => void;
  removeGuest: (index: number) => void;
  updateGuest: (index: number, guest: Partial<Guest>) => void;
  resetForm: () => void;
  clearForm: () => void;
}

const initialFormData: FormData = {
  name: "",
  description: "",
  category: "",
  numberOfAttendees: 0,
  date: "",
  startTime: "",
  endTime: "",
  venue: "",
  address: "",
  guestList: [],
  rsvpStatus: "Open",
  invitationCard: null,
};

export const useWeddingStore = create<WeddingStore>()(
  persist(
    (set) => ({
      formData: initialFormData,

      updateField: (field, value) =>
        set((state) => ({
          formData: { ...state.formData, [field]: value },
        })),

      addGuest: (guest) =>
        set((state) => ({
          formData: {
            ...state.formData,
            guestList: [...state.formData.guestList, guest],
          },
        })),

      removeGuest: (index) =>
        set((state) => ({
          formData: {
            ...state.formData,
            guestList: state.formData.guestList.filter((_, i) => i !== index),
          },
        })),

      updateGuest: (index, guest) =>
        set((state) => ({
          formData: {
            ...state.formData,
            guestList: state.formData.guestList.map((g, i) =>
              i === index ? { ...g, ...guest } : g
            ),
          },
        })),

      resetForm: () => set({ formData: initialFormData }),

      clearForm: () => {
        set({ formData: initialFormData });
        localStorage.removeItem("wedding-storage");
      },
    }),
    {
      name: "wedding-storage", 
      partialize: (state) => ({
        formData: { ...state.formData, invitationCard: null },
      }),
    }
  )
);
