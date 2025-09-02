"use client";

import Image from "next/image";
import { Calendar, Clock, Mesaging, Group } from "@/public/assets";
import { FormData } from "@/app/store/useWeddingStore";

interface Props {
  formData: FormData;
}

interface Guest {
  fullName: string;
  guestTitle: string;
  phoneNumber: string;
  emailAddress: string;
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
        <div className="flex items-center gap-5 mt-3">
          <h1 className="flex items-center gap-2">
            <Image src={Calendar} alt="calendar" /> {formData.date} &nbsp; &nbsp;
          </h1>
          <h1 className="flex items-center gap-2">
            <Image src={Clock} alt="calendar" /> {formData.startTime} &nbsp; &nbsp;
          </h1>
        </div>

        <div className="flex items-center gap-2 mt-3">
          <Image src={Group} alt="location" className="inline mr-2" />
          {formData.numberOfAttendees} Attendees
        </div>

        <div className="flex justify-between  mt-3 ">
          <p className="text-black bg-[#FFE38F] flex justify-center px-5 rounded-full ">
          {formData.category}

          </p>
        </div>

        <div className="text-text-primary mt-3 space-y-5 bg-tab-secondary p-5 rounded-2xl">
          <p className="font-semibold">About this event</p>

          <p>{formData.description}</p>
          </div>

    </div>



      </section>

   




   

      {/* Step 2: Guest Info */}
      <div className="bg-tab-primary p-5 rounded-2xl">
        <h2 className="text-xl font-semibold text-accent mb-2">Guest List</h2>
        {formData.guestList?.length > 0 ? (
          formData.guestList.map((guest: Guest, index: number) => (
            <div key={index} className="p-4 rounded-2xl bg-tab-secondary flex justify-between items-center text-text-primary mt-3">
            <div className="flex items-center gap-4">
              <p className="bg-accent p-5 rounded-2xl">
              <Image src={Mesaging} alt="Guest" className="h-10 w-10" />
              </p>
              <div className="space-y-5">
              <p>{guest.fullName}</p>
              <p className="text-gray">{guest.guestTitle}</p>
              </div>
              </div>
           
            {/* <div className="flex justify-end mt-2">
              <Button size="sm" onClick={() => handleEdit(index)}>
                Edit
              </Button>
            </div> */}
          </div>
          ))
        ) : (
          <p className="text-gray-500">No guests added.</p>
        )}
      </div>

   
    </section>
  );
}