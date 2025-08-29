'use client';

import * as React from 'react';
import { Card, CardContent } from '../../components/ui/card';
import { CalendarDays, MapPin, Ticket, Eye, Trash2, Pencil } from 'lucide-react';
import Image, { StaticImageData } from 'next/image';

interface UpcomingEventCardProps {
  name: string;
  location: string;
  createdAt: string;
  image: string  | StaticImageData;
  ticketSales?: number; 
  onClick: () => void;

}


export default function UpcomingEventCard({
  name,
  location,
  createdAt,
  image,
  ticketSales,
  onClick

}: UpcomingEventCardProps) {
  return (
    <Card className="rounded-xl p-4 border-none shadow-md w-full cursor-pointer bg-tab-primary" onClick={onClick}>
      <Image src={image} alt={name}  className="rounded-xl w-full h-full object-cover mb-4"
          width={500} height={250}   />

      <CardContent className="space-y-2 px-0">
        <h2 className="font-semibold text-xl text-text-primary">{name}</h2>
        <div className="text-sm text-gray flex items-center gap-2">
          {/* <MapPin className="h-4 w-4" /> */}
          {location}
        </div>
        <div className="text-sm text-gray flex items-center gap-2">
          {/* <CalendarDays className="h-4 w-4" /> */}
          {createdAt}
        </div>

        <div className="text-sm mt-2 font-medium text-text-primary flex justify-between items-center">
          <span>Ticket Sales</span>
          <span>{ticketSales}</span>
        </div>

        <div className="border-t mt-2 pt-2 flex justify-between items-center">
          <a href="#" className="text-sm text-accent hover:underline">
            View Details
          </a>
          <div className="flex gap-2 text-accent">
            <Eye className="w-4 h-4 cursor-pointer" />
            <Trash2 className="w-4 h-4 cursor-pointer" />
            <Pencil className="w-4 h-4 cursor-pointer" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
