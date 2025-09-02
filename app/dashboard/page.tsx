"use client"

import React, { useState } from "react";
import VendorPic from "@/public/assets/images/bgVendor.png";
import Image from "next/image";
import { Button } from "../components/ui/button";
import ResponseModal from "../components/ResponseModal";
import Step1 from "../components/form/StepOne";
import Step2 from "../components/form/StepTwo";
import Step3 from "../components/form/StepThree";
import Preview from "../components/form/Preview";
import { useWeddingStore } from "../store/useWeddingStore";
import { useWedding } from "../hooks/useWedding";

interface Guest {
  fullName: string;
  guestTitle: string;
  phoneNumber: string;
  emailAddress: string;
}

interface FormData {
  name: string;
  description: string;
  category: string;
  numberOfAttendees: number;
  date: string;               
  startTime: string;           // "HH:mm"
  endTime: string;             // "HH:mm"
  venue: string;
  address: string;
  guestList: Guest[];
  rsvpStatus: "Open" | "Closed";
  invitationCard: string | File | null;
}

export const LoadingModal = () => (
  <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
      <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-16 w-16 mb-4"></div>
      <p className="text-lg font-semibold">Creating Event...</p>
    </div>
  </div>
);

const SponsorForm = ({ onBack }: { onBack: () => void }) => {
  const [step, setStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const { formData, addGuest } = useWeddingStore();
  const { createEvent: createEventApi, uploadFile, uploadPlaces } = useWedding();
  const [eventLink, setEventLink] = useState('');
  const [orgLink, setOrgLink] = useState('');

  const [loading, setLoading] = useState(false);

  const [modal, setModal] = useState(false)
    const handleInputChange = <K extends keyof FormData>(
      field: K,
      value: FormData[K],
      guestIndex?: number
    ) => {
      if (guestIndex !== undefined) {
        useWeddingStore
          .getState()
          .updateGuest(guestIndex, { [field as string]: value } as any);
      } else {
        // Update top-level field
        useWeddingStore.getState().updateField(field, value);
      }
    };
    
    
    
    const nextStep = () => {
      let isValid = false;
    
      if (step === 1 && formData.name?.trim()) isValid = true;
      if (step === 2 && formData.guestList?.[0]?.fullName?.trim()) isValid = true;
      if (step === 3 && formData.name?.trim()) isValid = true; 
    
      if (isValid) {
        if (!completedSteps.includes(step)) {
          setCompletedSteps((prev) => [...prev, step]);
        }
        if (step < 4) setStep(step + 1);
      } else {
        alert("Please complete this step before proceeding.");
      }
    };

    function prevStep(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
      event.preventDefault();
      if (step > 1) {
        setStep(step - 1);
      }
    }

    const details = useWeddingStore((state) => state.formData);

    
    const createEvent = async () => {
      setLoading(true);
      try {
        const updatedDetails = { ...details };
    
        if (updatedDetails.invitationCard instanceof File) {
          const uploadedUrl = await uploadFile(updatedDetails.invitationCard);
          console.log("Uploaded URL:", uploadedUrl);
    
          updatedDetails.invitationCard = uploadedUrl;
        }
    
        if (typeof updatedDetails.numberOfAttendees === "string") {
          updatedDetails.numberOfAttendees = Number(updatedDetails.numberOfAttendees);
        }

        if (updatedDetails.venue) {
          const placeId = await uploadPlaces(updatedDetails.venue);
          console.log("Uploaded Place ID:", placeId);
        
          if (placeId) {
            updatedDetails.venue = placeId; 
          }
        }
        if (Array.isArray(updatedDetails.guestList)) {
          updatedDetails.guestList = updatedDetails.guestList.map(
            (guest) => guest
          );
        }
    
        console.log("Updated Details Sent:", updatedDetails);
    
        const response = await createEventApi(updatedDetails);
    
        console.log("Event created successfully:", response._id);
        setEventLink(`https://richlist-rouge.vercel.app/event/${response._id}/join`);
        setOrgLink(`https://richlist-rouge.vercel.app/organization/${response._id}/`);
        localStorage.setItem("_id", response._id);
        setModal(true);

      } catch (error) {
        console.error("Error creating event:", error);
      } finally {
        setLoading(false);
      }
    };

  
  return (
    <>


      {loading && <LoadingModal />}
      {/* Top Section with Background */}
      <div className="relative w-full h-[40vh] overflow-hidden">
        <Image
          src={VendorPic}
          alt="Vendor background"
          fill
          className="object-cover rounded-2xl"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />

        {/* Back Button */}
        <div className="absolute top-4 left-4 z-20">
          <Button onClick={onBack} className="bg-white text-black shadow hidden md:block">
            ← Back
          </Button>
        </div>

        {/* Step Indicators */}
        <div className="absolute z-20 top-24 left-1/2 -translate-x-1/2 text-white">
          <div className="flex items-center  w-[300px] md:w-[600px]">
            {[1, 2, 3].map((item, index) => (
              <React.Fragment key={item}>
                <div
                  className={`px-4 py-2 md:py-5 md:px-8 rounded-full flex items-center justify-center text-base md:text-3xl transition-colors duration-300
                    ${
                      completedSteps.includes(item)
                        ? "bg-accent"
                        : step === item
                        ? "bg-[#7D7D7D]"
                        : "bg-[#7D7D7D]"
                    }`}
                >
                  {item}
                </div>
                {index !== 2 && (
                  <div
                    className={`flex-1 h-0.5 transition-colors duration-300 ${
                      completedSteps.includes(item)
                        ? "bg-accent"
                        : "bg-[#7D7D7D]"
                    }`}
                  />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      <section className="px-2 md:px-0">

      <div className="  mt-5">
      {step === 1 && (
        <Step1
          formData={formData}
          onChange={(field, value) => handleInputChange(field as keyof FormData, value)}
        />
      )}
{step === 2 && (
  <Step2
    formData={formData}
    onChange={handleInputChange as (field: string, value: string, guestIndex?: number) => void}
    setFormData={addGuest}
  />
)}
{step === 3 && (
  <Step3
    formData={formData}
    onChange={(field, value) => handleInputChange(field as keyof FormData, value)}
  />
)}
{step === 4 && <Preview formData={formData} />}


      <div className={`flex ${step > 1 ? "justify-between" : "justify-end"}  mt-10`}>
      {step > 1 && (
    <Button
      onClick={prevStep}
      className="bg-gray-300 text-black hover:bg-gray-400"
    >
      Back
    </Button>
  )}

  {/* Next / Save & Preview / Save */}
  {step < 4 ? (
    <Button onClick={nextStep} className="bg-accent text-white">
      {step < 3 ? "Next" : "Save & Preview"}
    </Button>
) : (
  <Button onClick={createEvent} className="bg-accent text-white">
    Save
  </Button>
)}

      </div>
      </div>
      </section>
      {modal && (
        <ResponseModal
          secmessage="Copy Event Link"
          buttonText="Go to Events Page"
          title="Event Created Successfully!"
          eventLink={eventLink}
          onClose={() => (window.location.href = `${orgLink}`)}
        />
      )}
     
    </>
  );
};

export default SponsorForm;
