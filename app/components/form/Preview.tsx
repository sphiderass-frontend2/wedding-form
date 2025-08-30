"use client";

import Image from "next/image";

interface Props {
  formData: any;
}

export default function Preview({ formData }: Props) {
  return (
    <section className="p-6 rounded-xl border bg-white space-y-6">
      <h1 className="text-2xl font-bold text-accent">Final Preview</h1>

      {/* Step 1: Event Info */}
      <div>
        <h2 className="text-xl font-semibold text-accent mb-2">Event Info</h2>
        <p><strong>Event Name:</strong> {formData.eventName}</p>
        <p><strong>Date:</strong> {formData.eventDate}</p>
        <p><strong>Location:</strong> {formData.eventLocation}</p>
      </div>

      {/* Step 2: Guest Info */}
      <div>
        <h2 className="text-xl font-semibold text-accent mb-2">Guest List</h2>
        {formData.GuestList?.length > 0 ? (
          formData.GuestList.map((guest: any, index: number) => (
            <div key={index} className="mb-3 p-3 border rounded-lg">
              <p><strong>Full Name:</strong> {guest.fullName}</p>
              <p><strong>Title/Relation:</strong> {guest.title}</p>
              <p><strong>Phone:</strong> {guest.phoneNumber}</p>
              <p><strong>Email:</strong> {guest.email}</p>
              <p><strong>RSVP:</strong> {guest.rsvp}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No guests added.</p>
        )}
      </div>

      {/* Step 3: Invitation Card */}
      <div>
        <h2 className="text-xl font-semibold text-accent mb-2">
          Invitation Card
        </h2>
        {formData.banner ? (
          <Image
            src={
              typeof formData.banner === "string"
                ? formData.banner // in case it's stored as URL
                : URL.createObjectURL(formData.banner) // if it's a File
            }
            alt="Invitation Card"
            width={400}
            height={250}
            className="rounded-lg object-cover"
          />
        ) : (
          <p className="text-gray-500">No invitation uploaded.</p>
        )}
      </div>
    </section>
  );
}
