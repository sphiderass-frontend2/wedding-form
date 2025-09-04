'use client';

import React, { useState } from 'react';
import Corona from '@/public/assets/images/corona.png';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Dunsin from '@/public/assets/images/dunsin.png'
import { Ticket, Clock, Calendar, Edit } from '@/public/assets';
import { Button } from '@/app/components/ui/button';


  
  const getEventBgColor = (type: string): string => {
    switch (type.toLowerCase()) {
      case 'concert':
        return '#FFE38F80';
      case 'fest':
        return '#FF000033';
      case 'birthday':
        return '#09C82F33';
      case 'conference':
        return '#9201D033';
      default:
        return '#99999933'; // fallback color
    }
  };
  

const events = {
  upcoming: [
    {
      id: 1,
      title: "Dunsin Oyekan’s Upper Room",
      date: "November 3rd",
      time: "05:00PM",
      tickets: 50,
      type: "Concert",
      image: Dunsin,
      color: "#FFE38F800"
    },
    {
      id: 2,
      title: "Porter’s House Fest",
      date: "December 11th",
      time: "10:00PM",
      tickets: 15,
      type: "Fest",
      image: Dunsin,
      color: "bg-pink-500"
    },
    {
      id: 3,
      title: "Comrade Dani’s 60th Birthday Dinner",
      date: "December 20th",
      time: "08:00PM",
      tickets: 20,
      type: "Birthday",
      image: Dunsin,
      color: "bg-green-500"
    }
  ],
  past: [
    {
      id: 4,
      title: "GNF Conference",
      date: "December 28th",
      time: "09:00AM",
      tickets: 100,
      type: "Conference",
      image: Dunsin,
      color: "bg-purple-500"
    },
    {
      id: 5,
      title: "Tech Fest 2024",
      date: "August 5th",
      time: "11:00AM",
      tickets: 70,
      type: "Tech",
      image: Dunsin,
      color: "bg-yellow-500"
    },
    {
      id: 6,
      title: "Arts & Culture Expo",
      date: "July 20th",
      time: "03:00PM",
      tickets: 45,
      type: "Expo",
      image: Dunsin,
      color: "bg-blue-500"
    }
  ]
};

function Detail() {
  const router = useRouter();
  const [tab, setTab] = useState<'upcoming' | 'past'>('upcoming');
 

  const activeEvents = events[tab];

  return (
    <>
      <div
        className="relative w-full h-[300px] md:h-[400px] bg-cover bg-center rounded-t-2xl"
        style={{ backgroundImage: `url(${Corona.src})` }}
      >
        <div className="absolute inset-0 bg-black/50 rounded-t-2xl" />

        <div className="absolute top-4 left-4 z-20">
          <Button onClick={() => router.back()}>
            ← Back
          </Button>
        </div>
      </div>


      <section className='bg-tab-primary rounded-2xl w-full p-4 md:p-5 mt-10 text-text-primary'>

        <div className='space-y-3 '>
            <h1 className='font-bold text-2xl lg:text-3xl'>The  Corona</h1>
            <p className='text-gray font-normal'>Creation Date: 29 September, 2024</p>
            <p className='text-gray mt-7 text-lg md:text-xl'>Experience The Corona, a vibrant celebration of music, art, and culture! Enjoy live performances, captivating art installations, and a variety of delicious cuisine from local vendors. Connect with fellow enthusiasts in an unforgettable atmosphere filled with creativity and joy. Don’t miss this unique opportunity to celebrate together!</p>
        </div>


        <div className="px-3 md:px-0 py-8">
        <div className="flex mb-6 justify-center ">
            <div className='bg-tab-secondary px-6 py-4 rounded-full flex gap-4 '>
            <button
            className={`px-4 py-3 rounded-full cursor-pointer text-text-primary hover:bg-[#4D67FE33] ${tab === 'upcoming' ? 'bg-[#4D67FE33] ' : ''}`}
            onClick={() => setTab('upcoming')}
          >
            Upcoming Events
          </button>
          <button
            className={`px-4 py-3 rounded-full cursor-pointer text-text-primary  hover:bg-[#4D67FE33] ${tab === 'past' ? 'bg-[#4D67FE33] ' : ''}`}
            onClick={() => setTab('past')}
          >
            Past Events
          </button>
            </div>
        
        </div>

        <div className="space-y-6">
          {activeEvents.map(event => (
            <div key={event.id} className="flex items-start gap-4 bg-tab-secondary p-3 md:p-4 rounded-2xl cursor-pointer flex-wrap md:flex-nowrap" onClick={() => router.push("/dashboard/organization/2/analytics")}>
              <div className=" w-full md:w-60 h-40 rounded-md overflow-hidden">
                <Image src={event.image} alt={event.title} width={180} height={180} className="object-cover w-full h-full" />
              </div>
              <div className="flex-1 space-y-3">
                <h2 className="text-2xl font-semibold">{event.title}</h2>
                <div className="text-sm flex items-center gap-2 mt-1">
                <span
                    className="text-[#957414] px-3 py-1 rounded-full"
                    style={{ backgroundColor: getEventBgColor(event.type) }}
                    >
                    {event.type}
                    </span>
                </div>
                <div className="text-sm text-gray-500 mt-2 flex items-center gap-4">
                  <span className="flex items-center gap-1"> <Image src={Calendar} alt="ticket" />  {event.date}</span>
                  <span className="flex items-center gap-1"> <Image src={Clock} alt="ticket" />  {event.time}</span>
                </div>
                <div className="mt-2  text-[#FF0000] flex items-center gap-3"> <Image src={Ticket} alt="ticket" /> {event.tickets} Ticket Sold</div>
              </div>
              <div className=" text-accent cursor-pointer flex items-center gap-2">Edit Event  <Image src={Edit} alt='edit-icon' /> </div>
            </div>
          ))}
        </div>
      </div>



      </section>

 
    </>
  );
}

export default Detail;

