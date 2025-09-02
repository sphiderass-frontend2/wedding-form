"use client";

import ResponseModal from "@/app/components/ResponseModal";
import { Button } from "@/app/components/ui/button";
import React, { useState } from "react";

interface EventDetailsProps {
  onClose: () => void;
}

function EventDetails({ onClose }: EventDetailsProps) {
  const [showResponse, setShowResponse] = useState(false);
  const [showTicket, setShowTicket] = useState(false);

  return (
    <>
      {/* Card Payment Modal */}
      {!showResponse && !showTicket && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-black/50 p-5 font-text">
          <div className="bg-tab-primary rounded-xl w-full max-w-md p-6 shadow-lg text-text-primary space-y-5 text-xl">
            <h1 className="text-2xl text-accent">Event Details</h1>
            <p>
              {" "}
              Username: <span className="text-gray">
                {" "}
                Charles Chiwendu
              </span>{" "}
            </p>
            <p>
              {" "}
              Prize: <span className="text-gray"> Charles Chiwendu</span>{" "}
            </p>
            <p>
              {" "}
              Date & Time: <span className="text-gray">
                {" "}
                Charles Chiwendu
              </span>{" "}
            </p>
            <p>
              {" "}
              Ticket Name: <span className="text-gray">
                {" "}
                Charles Chiwendu
              </span>{" "}
            </p>
            <p>
              Status:{" "}
              <span className=" bg-[#936C0033] text-error text-xs p-2 rounded-xl">
                Not admitted
              </span>{" "}
            </p>
            <p>
              {" "}
              Refund Request: <span className="text-error"> Yes</span>{" "}
            </p>
            <p>
              {" "}
              Reason for refund:{" "}
              <span className="text-gray">
                {" "}
                “I have an engagement slated for event day”{" "}
              </span>{" "}
            </p>

            <Button onClick={() => setShowResponse(true)}>
              Approve Refund
            </Button>
          </div>
        </div>
      )}

      {/* Response Modal */}
      {showResponse && (
        <ResponseModal
          title="Done and dusted, refund approved!"
          message="We’ve notified the user, and their refund is now being processed."
          buttonText="Continue"
          onClose={onClose}
        />
      )}
    </>
  );
}

export default EventDetails;
