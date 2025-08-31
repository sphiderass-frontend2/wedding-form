import { useCallback } from "react";
import { useAuthStore } from "../store/useAuthStore";

const api = process.env.NEXT_PUBLIC_API_URL;

export const useWedding = () => {
  // Correctly select the token from the store
  const token = useAuthStore((state) => state.token);

  const uploadFile = useCallback(
    async (invitationCard: File): Promise<string> => {
      const formData = new FormData();
      formData.append("invitationCard", invitationCard);
  
      const response = await fetch(`${api}events/upload`, {
        method: "POST",
        headers: token
          ? { Authorization: `Bearer ${token}` } // no Content-Type here
          : undefined,
        body: formData,
      });
  
      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.message || "Failed to upload file");
      }
  
      const data = await response.json();
      return data.url ?? data; // return uploaded file URL
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

