"use client";

import { useSearchParams } from "next/navigation";
import ResponseModal from "@/app/components/ResponseModal";
import { useWedding } from "@/app/hooks/useWedding";
import { useEffect, useState } from "react";

export default function RSVPPage({
  params,
}: {
  params: { eventId: string; rsvp: string };
}) {
  const searchParams = useSearchParams();
  const responseStatus = searchParams.get("response"); 
  const { eventId, rsvp } = params;
  const { invitationDecision, getEvent } = useWedding();

  const [event, setEvent] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [modalMessage, setModalMessage] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [processing, setProcessing] = useState(true);

  // Fetch event data
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const data = await getEvent(eventId);
        setEvent(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, [eventId, getEvent]);

  useEffect(() => {
    const submitResponse = async () => {
      if (responseStatus === "accept" || responseStatus === "decline") {
        const backendResponse = responseStatus === "accept" ? "accepted" : "declined";
  
        try {
          setProcessing(true);
          await invitationDecision(rsvp, backendResponse);
          setModalMessage(
            backendResponse === "accepted"
              ? "Thank you for accepting the invitation!"
              : "Sorry you can’t make it. Maybe next time!"
          );
        } catch (err) {
          setModalMessage("Failed to record your response. Please try again.");
          console.error(err);
        } finally {
          setProcessing(false);
          setModalOpen(true);
        }
      }
    };
    submitResponse();
  }, [rsvp, responseStatus, invitationDecision]);
  

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading event details...</p>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center p-6"
      style={{ backgroundImage: `url(${event?.invitationCard})` }}
    >
   
      

        {/* Processing state */}
        {processing && (
          <div className="w-full text-center py-6">
            <p className="text-lg font-medium text-text-primary">
              Processing your response...
            </p>
          </div>
        )}

        {/* Response modal */}
        {modalOpen && (
          <ResponseModal
            title="RSVP Response"
            message={modalMessage}
            buttonText="Close"
            onClose={() => setModalOpen(false)}
          />
        )}
    </div>
  );
}
