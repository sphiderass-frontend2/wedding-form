"use client"

import React, { useState } from "react";
import VendorPic from "@/public/assets/images/bgVendor.png";
import Image from "next/image";
import { Button } from "./components/ui/button";
import { Upload, Building, InstagramOutline } from "@/public/assets";
import Resturant from '@/public/assets/images/resturant.png'
import ResponseModal from "./components/ResponseModal";
import { useRouter } from "next/navigation";
import Step1 from "./components/form/StepOne";
import Step2 from "./components/form/StepTwo";
import Step3 from "./components/form/StepThree";
import Preview from "./components/form/Preview";

interface FormData {
  name: string,
  phone: string,
  address: string,
  description: string,
  brandName: string,
  website: string,
  instagram: string,
  facebook: string,
  venue: string,
  category: string
  attendee: string
  GuestList?: Guest[]
  banner: File | null
}

interface Guest {
  fullName: string;
  title: string;
  phoneNumber: string;
  email: string;
  rsvp: string;
}
const InputField = ({
  label,
  required,
  placeholder,
  value,
  onChange,
}: {
  label: string;
  required?: boolean;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
}) => (
  <div>
    <h2 className="text-xl font-medium mb-2 text-text-primary">
      {label} {required && "*"}
    </h2>
    <input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full border border-text-primary/50 py-3 px-4 rounded-full text-text-primary placeholder:text-gray outline-none"
    />
  </div>
);

const SponsorForm = ({ onBack }: { onBack: () => void }) => {
    const router = useRouter()
  const [step, setStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    phone: "",
    address: "",
    brandName: "",
    website: "",
    instagram: "",
    facebook: "",
    venue: "",
    description: "",
    category: "",
    attendee: "",
    GuestList: [],
    banner: null,
  });
  const [modal, setModal] = useState(false)
   const [state, setState] = useState({
      banner: null as File | null,
      bannerPreview: null as string | null,
      orgName: '',
      email: '',
      description: '',
      address: '',
      selectedCategories: [] as string[],
      isDragging: false,
      successModal: false,
    });

    const handleInputChange = (
      field: string,
      value: string | File,
      guestIndex?: number
    ) => {
      setFormData((prev) => {
        // If updating a guest inside GuestList
        if (guestIndex !== undefined) {
          const updatedGuests = [...(prev.GuestList || [])];
    
          if (!updatedGuests[guestIndex]) {
            updatedGuests[guestIndex] = {
              fullName: "",
              title: "",
              phoneNumber: "",
              email: "",
              rsvp: "",
            };
          }
    
          (updatedGuests[guestIndex] as any)[field] = value;
          return { ...prev, GuestList: updatedGuests };
        }
    
        // Otherwise update a top-level field (string OR File)
        return { ...prev, [field]: value };
      });
    };
    
    

  const nextStep = () => {
    let isValid = false;
    if (step === 1 && formData.name.trim()) isValid = true;
    if (step === 2 && formData.GuestList?.[0]?.fullName.trim()) isValid = true;
    if (step === 3 && formData.name.trim()) isValid = true;

    if (isValid) {
      if (!completedSteps.includes(step)) {
        setCompletedSteps((prev) => [...prev, step]);
      }
      if (step < 3) setStep(step + 1);
    } else {
      alert("Please complete this step before proceeding.");
    }
  };





  return (
    <>
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


      <div className="bg-tab-primary rounded-2xl py-7 px-6">
      {step === 1 && <Step1 formData={formData} onChange={handleInputChange} />}
      {step === 2 && <Step2 formData={formData} onChange={handleInputChange} setFormData={setFormData} />}
      {step === 3 && <Step3 formData={formData} onChange={handleInputChange} />}
      {step === 4 && <Preview formData={formData} />}


      <div className="flex justify-end mt-10">
        {step < 4 ? (
          <Button onClick={nextStep} className="bg-accent text-white">
           {step < 2 ? " Next ": "Save & Preview"}
          </Button>
        ) : (
          <Button onClick={() => setModal(true)} className="bg-accent text-white">
            Proceed to Payment
          </Button>
        )}
      </div>
      </div>
      {modal && (
        <ResponseModal
          message="You have successfully applied to become a vendor 🎉"
          buttonText="Go back to Homepage"
          title="Payment Successful!"
          onClose={() => (window.location.href = "/dashboard")}
        />
      )}
     
    </>
  );
};

export default SponsorForm;
