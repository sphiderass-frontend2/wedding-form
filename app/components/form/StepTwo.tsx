"use client";

import InputField from "../InputField";
import { Button } from "../ui/button";
import { useState } from "react";
import Image from "next/image";
import { Mesaging } from "@/public/assets";
import { FormData } from "@/app/store/useWeddingStore";

interface Guest {
  fullName: string;
  guestTitle: string;
  phoneNumber: string;
  emailAddress: string;
}

interface Props {
  formData: FormData;
  onChange: (field: string, value: string, guestIndex?: number) => void;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
  removeGuest: (index: number) => void;
}

export default function Step2({ formData, onChange, setFormData,  removeGuest }: Props) {
  const [showPreview, setShowPreview] = useState(false);
  const [activeGuestIndex, setActiveGuestIndex] = useState<number | null>(0);

  // ✅ Add Guest only if current guest is valid
  const handleAddGuest = () => {
    // Check if last active guest is valid before adding a new one
    if (formData.guestList && formData.guestList.length > 0) {
      const lastGuest = formData.guestList[formData.guestList.length - 1];
      if (!lastGuest.fullName?.trim()) {
        alert("Please fill in the current guest details before adding another.");
        return;
      }
    }

    setFormData((prev: any) => {
      const updatedList = [
        ...(prev.guestList || []),
        {
          fullName: "",
          guestTitle: "",
          phoneNumber: "",
          emailAddress: "",
          rsvp: "",
        },
      ];
      return { ...prev, guestList: updatedList };
    });

    setActiveGuestIndex(formData.guestList?.length || 0);
    setShowPreview(false);
  };


  const handleDelete = (index: number) => {
    removeGuest(index);
  
    if (activeGuestIndex === index) {
      setActiveGuestIndex(null);
      setShowPreview(false);
    } else if (activeGuestIndex !== null && activeGuestIndex > index) {
      setActiveGuestIndex(activeGuestIndex - 1);
    }
  };
  

  // Save & show preview
  const handleSave = () => {
    setShowPreview(true);
    setActiveGuestIndex(null);
  };

  // Back to editing
  const handleEdit = (index: number) => {
    setActiveGuestIndex(index);
    setShowPreview(false);
  };

  const activeGuest =
    activeGuestIndex !== null &&
    formData.guestList &&
    formData.guestList.length > 0
      ? formData.guestList[activeGuestIndex]
      : null;

  return (
    <div className="bg-tab-primary p-5 rounded-2xl">
      <h1 className="text-accent text-2xl font-semibold">Guest Info</h1>
      <p className="mt-3 text-gray">Manage your guest</p>

      {/* Always Visible Header + Add Button */}
      <div className="mt-6">
        <div className="flex justify-between items-center">
          <p className="text-accent text-2xl font-semibold">Guest List</p>
          <button
            type="button"
            onClick={handleAddGuest}
            className="text-accent font-semibold cursor-pointer relative z-[9999]"
          >
            + Add Guest
          </button>
        </div>
      </div>

      {/* ---- Show Active Form if NOT in Preview ---- */}
      {!showPreview && activeGuest ? (
        <div className="space-y-3 p-4 rounded-xl mt-4 ">
          <InputField
            label="Full Name"
            required
            placeholder="Enter Full Name"
            value={activeGuest?.fullName ?? ""}
            onChange={(v) => onChange("fullName", v, activeGuestIndex!)}
          />

          <InputField
            label="Relationship"
            placeholder="Enter Title/Relation"
            value={activeGuest?.guestTitle ?? ""}
            onChange={(v) => onChange("guestTitle", v, activeGuestIndex!)}
          />

          <h2 className="text-accent text-xl font-semibold mt-4">
            Contact Details
          </h2>

          <InputField
            label="Phone Number"
            placeholder="Enter Phone Number"
            value={activeGuest?.phoneNumber ?? ""}
            onChange={(v) => onChange("phoneNumber", v, activeGuestIndex!)}
          />

          <InputField
            label="Email"
            placeholder="Enter Email"
            value={activeGuest?.emailAddress ?? ""}
            onChange={(v) => onChange("emailAddress", v, activeGuestIndex!)}
          />

          <h2 className="text-accent text-xl font-semibold mt-4">
            RSVP Management
          </h2>

          {/* Save button */}
          <div className="flex justify-end mt-10">
            <Button variant="outline" onClick={handleSave}>
              Save & Preview
            </Button>
          </div>
        </div>
      ) : null}

      {/* ---- Show Preview ---- */}
      {showPreview && (
        <div className="p-4 space-y-5">
          {formData.guestList?.map((guest: Guest, index: number) => (
            <div
              key={index}
              className="p-4 rounded-2xl bg-tab-secondary flex justify-between items-center text-text-primary"
            >
              <div className="flex items-center gap-4">
                <p className="bg-accent p-5 rounded-2xl">
                  <Image src={Mesaging} alt="Guest" className="h-10 w-10" />
                </p>
                <div className="space-y-2">
                  <p>{guest.fullName}</p>
                  <p className="text-gray">{guest.guestTitle}</p>
                </div>
              </div>

              <div className="flex gap-2">
                <Button size="sm" onClick={() => handleEdit(index)}>
                  Edit
                </Button>
                <Button size="sm" variant="outline" onClick={() => handleDelete(index)}>
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
