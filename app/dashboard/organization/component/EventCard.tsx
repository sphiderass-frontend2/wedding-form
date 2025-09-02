'use client';

import React, { useEffect, useState } from 'react';
import Image, { StaticImageData } from 'next/image';
import { BuildingLite, Ticket } from '@/public/assets';
import { useRouter } from 'next/navigation';

interface EventCardProps {
  imageUrl: string | StaticImageData;
  title: string;
  ticketCount: number;
  eventCount: number;
}

const EventCard: React.FC<EventCardProps> = ({ imageUrl, title, ticketCount, eventCount }) => {
  const router = useRouter()




  return (
    <div className="w-full rounded-3xl overflow-hidden bg-card-background text-text-primary cursor-pointer" onClick={() => router.push("/dashboard/organization/2/detail")}>
      <div className="w-full h-44 relative">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover"
        />
      </div>

      <div className="p-4">
        <div className="flex justify-between items-center mb-1">
          <p className="font-semibold text-base flex items-center gap-3">   <Image src={BuildingLite} alt='ticket' /> {title}</p>
          <p className="text-xs text-accent "> 
            {eventCount} Event</p>
        </div>

        <div className="flex items-center gap-1 text-sm">
            <Image src={Ticket} alt='ticket' />
          <span className="text-red-500 font-semibold">{ticketCount} Tickets Sold</span>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
