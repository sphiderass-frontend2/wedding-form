"use client";

import Image from "next/image";
import { Calendar, Clock } from "@/public/assets";

interface Props {
  formData: any;
}

export default function Preview({ formData }: Props) {
  return (
    <section className="p-6 text-text-primary space-y-6">

         {/* Step 3: Invitation Card */}
         <section className="bg-tab-primary px-5 py-7 rounded-2xl space-y-4">
         <div className="flex justify-center">
     
        {formData.invitationCard ? (
          <Image
            src={
              typeof formData.invitationCard === "string"
                ? formData.invitationCard // in case it's stored as URL
                : URL.createObjectURL(formData.invitationCard) // if it's a File
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

      <div>
        <h1 className="text-3xl font-semibold">{formData.name}</h1>
        <div>
          <h1>
            <Image src={Calendar} alt="calendar" /> {formData.date} &nbsp; &nbsp;
          </h1>
        </div>

    </div>



      </section>

   




      {/* Step 1: Event Info */}
      <div>
        <h2 className="text-xl font-semibold text-accent mb-2">Event Info</h2>
        <p><strong>Event Name:</strong> </p>
        <p><strong>Date:</strong> {formData.eventDate}</p>
        <p><strong>Location:</strong> {formData.eventLocation}</p>
      </div>

      {/* Step 2: Guest Info */}
      <div>
        <h2 className="text-xl font-semibold text-accent mb-2">Guest List</h2>
        {formData.uestList?.length > 0 ? (
          formData.uestList.map((guest: any, index: number) => (
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

   
    </section>
  );
}
