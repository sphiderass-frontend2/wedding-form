import { useCallback } from "react";
import { useAuthStore } from "../store/useAuthStore";

const api = process.env.NEXT_PUBLIC_API_URL;

export const useWedding = () => {
  // Correctly select the token from the store
  const token = useAuthStore((state) => state.token);

  const uploadFile = useCallback(
    async (invitationCard: File): Promise<string> => {
      if (!token) throw new Error("No auth token provided");

      const formData = new FormData();
      formData.append("invitationCard", invitationCard);

      const apiUrl = api?.endsWith("/") ? api : `${api}/`;
      const response = await fetch(`${apiUrl}events/upload`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` }, // no Content-Type needed
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.message || "Failed to upload file");
      }

      const data = await response.json();

      // Backend returns `fileUrls` array
      if (Array.isArray(data.fileUrls) && data.fileUrls[0])
        return data.fileUrls[0];
      if (typeof data === "string") return data;

      throw new Error("Invalid upload response");
    },
    [token]
  );

  const uploadPlaces = useCallback(
    async (text: string): Promise<string | null> => {
      const apiUrl = api?.endsWith("/") ? api : `${api}/`;
      const response = await fetch(`${apiUrl}events/get-location`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ text: text }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.message || "Failed to create place");
      }

      const data = await response.json();
      return data[0]?.place_id ?? null;
    },
    [token]
  );

  const createEvent = useCallback(
    async (eventData: any): Promise<any> => {
      // Ensure proper URL construction with trailing slash
      const apiUrl = api?.endsWith("/") ? api : `${api}/`;

      console.log("Creating event with URL:", `${apiUrl}events`);
      console.log("Event data being sent:", eventData);

      const response = await fetch(`${apiUrl}events`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(eventData),
      });

      console.log("Response status:", response.status);
      console.log(
        "Response headers:",
        Object.fromEntries(response.headers.entries())
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        console.error("Error response:", errorData);
        throw new Error(
          errorData?.message ||
            `HTTP ${response.status}: ${response.statusText} - Failed to create event`
        );
      }

      const data = await response.json();
      return data;
    },
    [token]
  );

  const getEvent = useCallback(
    async (id: string): Promise<any> => {
      const apiUrl = api?.endsWith("/") ? api : `${api}/`;
      const response = await fetch(`${apiUrl}events/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch event");
      }

      const data = await response.json();
      return data;
    },
    [token]
  );

  const inviteIndvidually = useCallback(
    async ( eventId: string, guestData: any,): Promise<any> => {
      const response = await fetch(`${api}rsvp/events/${eventId}/request`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(guestData),
      });

      if (!response.ok) {
        throw new Error("Failed to invite guest");
      }

      const data = await response.json();
      return data;
    },
    [token]
  );

  const invitationDecision = useCallback(
    async ( rsvpId: string, responseStatus: string,): Promise<any> => {
      const response = await fetch(`${api}rsvp/${rsvpId}/respond`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ response: responseStatus }),
      });

      if (!response.ok) {
        throw new Error("Failed to respond to invitation");
      }

      const data = await response.json();
      return data;
    },
    [token]
  );



  return { uploadFile, createEvent, uploadPlaces, getEvent, inviteIndvidually, invitationDecision };
};
