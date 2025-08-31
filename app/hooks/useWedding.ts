import { useCallback } from "react";
import { useAuthStore } from "../store/useAuthStore";

const api = process.env.NEXT_PUBLIC_API_URL;

export const useWedding = () => {
  // Correctly select the token from the store
  const token = useAuthStore((state) => state.token);

  const uploadFile = useCallback(
    async (file: File): Promise<string> => {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch(`${api}events/upload`, {
        method: "POST",
        headers: token
          ? { Authorization: `Bearer ${token}` }
          : undefined, // add auth header if available
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload file");
      }

      const data = await response.json();
      return data.url ?? data; // in case backend wraps URL in { url: "..." }
    },
    [token]
  );

  const createEvent = useCallback(
    async (eventData: any): Promise<any> => {
      const response = await fetch(`${api}events`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(eventData),
      });

      if (!response.ok) {
        throw new Error("Failed to create event");
      }

      const data = await response.json();
      return data;
    },
    [token]
  );

  return { uploadFile, createEvent };
};

