'use client';

import React, { useEffect, useState } from 'react';
import Image, { StaticImageData } from 'next/image';
import { Button } from '../../../components/ui/button';
import InputField from '@/app/components/InputField';
import { useParams } from "next/navigation";
import { useWedding } from '@/app/hooks/useWedding';
import ResponseModal from '@/app/components/ResponseModal';





const EventDetail = () => {
  const { getEvent, inviteIndvidually }   = useWedding();
  const [openForm, setOpenForm] = useState(false)
  const [event, setEvent] = useState<any | null>(null);
  const [formData, setFormData] = useState({
    fullName: "",
    guestTitle: "",
    phoneNumber: "",
    emailAddress: "",
  });
  const [showResponseModal, setShowResponseModal] = useState(false);
  
  const params = useParams();
   const id = params?.id; 
   console.log("Event ID from URL:", id);

   useEffect(() => {
    const fetchEvent = async () => {
        try {
            if (id) {
            const data = await getEvent(Array.isArray(id) ? id[0] : id);
            console.log("Fetched Event Data:", data);
            setEvent(data);
            }
        } catch (error) {
            console.error("Error fetching event:", error);
        }
        }
        fetchEvent();
    }
, [id, getEvent]);


    const handleChange = (field: string, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
      };
      
      const handleSave = async () => {
        
        console.log("Form Data Submitted:", formData);
        try {
          const response = await inviteIndvidually(id as string, formData);
          setShowResponseModal(true);
          console.log("Invitation sent successfully:", response);
        } catch (error) {
          console.error("Error sending invitation:", error);
        }
        setOpenForm(false); 
      }
   

      console.log("Invitation Card URL:", event?.invitationCard);


  return (
    <>
    <div className="relative w-full h-[80vh] overflow-hidden">
  {event?.invitationCard ? (
    <Image
    src={event?.invitationCard as string | StaticImageData}
      alt="Invitation Card"
      fill
      className="object-cover"
      priority
      unoptimized
    />
  ) : (
    <div className="flex items-center justify-center w-full h-full bg-gray-200">
      <p className="text-gray-600">No image available</p>
    </div>
  )}

 
</div>


   
<section className='px-10'>


      {openForm ? (
<section className='px-5 md:px-0'>

          <div className="space-y-3 p-4 rounded-xl mt-4  bg-tab-secondary">
                <InputField
  label="Full Name"
  required
  placeholder="Enter Full Name"
  value={formData.fullName}
  onChange={(value: string) => handleChange("fullName", value)}
/>
       
                 <InputField
                   label="Title/Relation"
                   placeholder="Enter Title/Relation"
                   value={formData.guestTitle}
                   onChange={(value: string) => handleChange("guestTitle", value)}
                 />
       
                 <h2 className="text-accent text-xl font-semibold mt-4">
                   Contact Details
                 </h2>
       
                 <InputField
                   label="Phone Number"
                   placeholder="Enter Phone Number"
                   value={formData.phoneNumber}
                   onChange={(value: string) => handleChange("phoneNumber", value)}
                 />
       
                 <InputField
                   label="Email"
                   placeholder="Enter Email"
                  value={formData.emailAddress}
                   onChange={(value: string) => handleChange("emailAddress", value)}
                 />
       
                 {/* Save button */}
                 <div className="flex justify-end mt-10">
                   <Button variant="outline" onClick={handleSave}>
                     Save & Preview
                   </Button>
                 </div>
               </div>
          </section>

      ) : (
      <section className='px-2 md:px-0'>


      <section className="px-6 py-10 bg-tab-primary mt-10 rounded-2xl">
        <div className="flex flex-col gap-4 items-start">
          <h1 className="text-3xl font-bold text-text-primary">{event?.name}</h1>
          <p className="text-text-primary">
          {new Date(event?.date).toLocaleDateString("en-US", {
  year: "numeric",
  month: "long",
  day: "numeric",
})}
          </p>
          <span className="bg-[#FFCDCD] text-[#FF0000] text-xs px-4 py-2 rounded-full">
            {/* {event.category} */}
            {event?.category}
          </span>
          <div className=" md:w-2/3 mt-6 space-y-5 ">
         
           
          </div>


          <div className='bg-tab-secondary p-4 w-full rounded-2xl space-y-4'>
            <p className='text-2xl font-medium text-text-primary'>About this Event</p>

          <p className="text-base text-[#888888]">
            {event?.description || 'No description available.'}
          </p>

          </div>
        </div>
      </section>


      <section className="px-6 py-10 bg-tab-primary mt-10 rounded-2xl">
        <div>
          <h1 className='text-[#4D67FE]  text-2xl font-medium'>Location & Map</h1>
        </div>

       
        <div className='mb-6 mt-4'>
          <h1 className='text-xl font-semibold'>Venue</h1>
          <p>{event?.venue}</p>
        </div>

        


        <div>
                  {/* === Google Map === */}
                  {event?.location && (
  <iframe
    title="Event Location"
    width="100%"
    height="450"
    loading="lazy"
    allowFullScreen
    referrerPolicy="no-referrer-when-downgrade"
    src={`https://www.google.com/maps?q=${event.location[1]},${event.location[0]}&hl=en&z=14&output=embed`}
  />
)}
        </div>


        <div className='mt-6'>
          <h1 className='text-xl font-semibold'>Address</h1>
          <p>{event?.address}</p>
        </div>
     

          
    
      </section>

      <section className='flex justify-end mt-10 px-6'>
      <div>
                <p className='text-gray'>Want to attend ?</p>
                <Button onClick={() => setOpenForm(true)} className='mt-3'>
                    Open Form
                </Button>
            </div>
      </section>
      </section>

          )}
    </section>

    {showResponseModal && (
      <ResponseModal
        title="Request Sent Successfully!"
        buttonText="Close"
        onClose={() => setShowResponseModal(false)}
        message='You have successfully requested to go to this event. '
        note='Please wait for the host to approve your request.'
        />
        )}
    </>
  );
};

export default EventDetail;

