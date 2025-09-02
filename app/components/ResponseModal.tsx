import React, { useState } from "react";
import { Button } from "./ui/button";
import { Copy } from "@/public/assets";
import Image from "next/image";

type ResponseModalProps = {
  title: string;
  message?: string; 
  note?: string;
  secmessage?: string;
  buttonText?: string;
  eventLink?: string; 
  onClose?: () => void;
};

const ResponseModal: React.FC<ResponseModalProps> = ({
  onClose,
  message,
  secmessage,
  note,
  title,
  buttonText,
  eventLink,
}) => {
  const [copied, setCopied] = useState(false);

  const handleGoBack = () => {
    if (onClose) {
      onClose();
    }
  };

  const handleCopy = async () => {
    if (eventLink) {
      try {
        await navigator.clipboard.writeText(eventLink);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error("Failed to copy text: ", err);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-black/50 p-5 font-text">
      <div className="flex h-[70vh] w-full max-w-lg flex-col justify-end space-y-5 rounded-lg bg-tab-primary py-6 px-5 md:px-14 shadow-lg text-text-primary">
        <div className="grow"></div>
        <div className="flex flex-col items-center gap-5 text-center">
          <h2 className="text-3xl font-medium">{title}</h2>


          {message && <p className="text-gray">{message}</p>}


          {note && (
            <p className="text-gray">
              Note: <span className="text-black">{note}</span>
            </p>
          )}

          <div className="w-full">
            <Button onClick={handleGoBack} className="w-full">
              {buttonText}
            </Button>
          </div>

          {/* Show message if available */}
          {secmessage && <p className="text-gray">{secmessage}</p>}

          {/* Show copy link section only if eventLink is passed */}
          {eventLink && (
            <div className="flex  items-center justify-between w-full border-text-gray/50 border p-4 rounded-full">
              <p className="break-words text-sm">{eventLink.slice(0, 25)}....</p>
              <button
                onClick={handleCopy}
                className="border-none text-sm cursor-pointer"
              >
                {copied ? "Copied!" :  <Image src={Copy} alt="Copy" className="inline ml-2" />}
               
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResponseModal;

