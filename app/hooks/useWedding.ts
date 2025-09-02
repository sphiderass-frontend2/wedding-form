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
  
      const response = await fetch(`${api}events/upload`, {
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
      if (Array.isArray(data.fileUrls) && data.fileUrls[0]) return data.fileUrls[0];
      if (typeof data === "string") return data;
  
      throw new Error("Invalid upload response");
    },
    [token]
  );


  const uploadPlaces = useCallback(
    async (text: string): Promise<string | null> => {
      const response = await fetch(`${api}events/get-location`, {
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
      localStorage.setItem("_id", data._id);
      return data;
    },
    [token]
  );

  const getEvent = useCallback(
    async (id: string): Promise<any> => {
      const response = await fetch(`${api}events/${id}`, {
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
    async (eventId: string, guestData: any): Promise<any> => {
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
    async (rsvpId: string, responseStatus: string): Promise<any> => {
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

  const getEventDashboard = useCallback(
    async (eventId: string): Promise<any> => {
      const apiUrl = api?.endsWith("/") ? api : `${api}/`;

      console.log(
        "Fetching event dashboard with URL:",
        `${apiUrl}organisation/events/${eventId}/dashboard`
      );

      const response = await fetch(
        `${apiUrl}organisation/events/${eventId}/dashboard`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
        }
      );

      console.log("Dashboard response status:", response.status);

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        console.error("Dashboard error response:", errorData);
        throw new Error(
          errorData?.message ||
            `HTTP ${response.status}: ${response.statusText} - Failed to fetch event dashboard`
        );
      }

      const data = await response.json();
      return data;
    },
    [token]
  );

  const getEventRSVPs = useCallback(
    async (
      eventId: string,
      status?: string,
      page: number = 1,
      limit: number = 20
    ): Promise<any> => {
      const apiUrl = api?.endsWith("/") ? api : `${api}/`;

      // Build query parameters
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
      });

      if (status && status !== "all") {
        params.append("status", status);
      }

      const url = `${apiUrl}organisation/events/${eventId}/rsvps?${params.toString()}`;

      console.log("Fetching RSVPs with URL:", url);

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      });

      console.log("RSVPs response status:", response.status);

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        console.error("RSVPs error response:", errorData);
        throw new Error(
          errorData?.message ||
            `HTTP ${response.status}: ${response.statusText} - Failed to fetch RSVPs`
        );
      }

      const data = await response.json();
      return data;
    },
    [token]
  );

  const updateRSVPStatus = useCallback(
    async (rsvpId: string, status: "accepted" | "declined"): Promise<any> => {
      const apiUrl = api?.endsWith("/") ? api : `${api}/`;

      console.log(`Updating RSVP ${rsvpId} status to:`, status);

      const response = await fetch(
        `${apiUrl}organisation/rsvps/${rsvpId}/status`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
          body: JSON.stringify({ status }),
        }
      );

      console.log("Update RSVP response status:", response.status);

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        console.error("Update RSVP error response:", errorData);
        throw new Error(
          errorData?.message ||
            `HTTP ${response.status}: ${response.statusText} - Failed to update RSVP status`
        );
      }

      const data = await response.json();
      return data;
    },
    [token]
  );

  return {
    uploadFile,
    createEvent,
    uploadPlaces,
    getEvent,
    inviteIndvidually,
    invitationDecision,
    getEventDashboard,
    getEventRSVPs,
    updateRSVPStatus,
  };
};
