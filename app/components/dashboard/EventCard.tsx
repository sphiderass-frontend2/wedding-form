'use client';

import * as React from 'react';
import { Card, CardContent } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Location, ArrowMore } from '@/public/assets';
import Image, { StaticImageData } from 'next/image';


interface TrendingEventCardProps {
  id: string;
  title: string;
  image: string | StaticImageData;
  location: string;
  createdAt: string;
  description?: string;
  type?: string; 
  category: string;
  ticketSales?: number;
  onClick: () => void;
}


export default function TrendingEventCard({
  title,
  image,
  location,
  createdAt,
  description,
  category,
  onClick
}: TrendingEventCardProps) {
  const [count, setCount] = React.useState(1);

  return (
    <Card className="rounded-xl p-4 border-none shadow-md bg-tab-primary w-full cursor-pointer">
      <div className="relative"  onClick={onClick}>
        <Image
          src={image}
          alt={title}
       className="rounded-xl w-full h-full object-cover mb-4"
          width={500} height={250} 
        />
        <span
          className="absolute top-2 left-2 text-white text-xs px-6 py-3 rounded-full bg-gradient-to-t from-[#A1A1A166] to-[#FFFFFF99]"
          style={{
            boxShadow: `
              inset 0.76px 0.76px 3.04px #FFFFFF99,
              inset -0.76px -0.76px 0.76px #A1A1A166,
              inset -0.76px -0.76px 0.76px #FFFFFF66,
              inset 0.76px 0.76px 0.76px #FFFFFF40
            `,
          }}
        >
          VIP Available
        </span>

        <span className="absolute -bottom-2 right-2 bg-[#FFCDCD] text-[#FF0000] text-xs px-4 py-2 rounded-full">
          {category}
        </span>
      </div>

      <CardContent className="space-y-3 px-0">
        <div className='flex justify-between items-start'>
          <div className='space-y-3'>
        <h2 className="font-medium text-2xl text-text-primary">{title}</h2>
        <div className="text-sm text-gray">
            {new Date(createdAt).toLocaleString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: 'numeric',
              minute: '2-digit',
              hour12: true,
            })}
          </div>
          </div>

          <div className="text-sm text-gray-500 flex items-center gap-2"> 
          <Image src={Location} alt='location' width={20} height={20} />
          {location}</div>

        </div>
       
      

        {description && (
          <p className="text-sm text-text-primary line-clamp-2"  onClick={onClick}>{description}</p>
        )}

        <p className='text-gray text-sm flex items-center'  onClick={onClick}>More info 
          <Image src={ArrowMore} alt='arrow-more'  width={10} height={20} />
        </p>


      

        <div className="flex items-center justify-between mt-4">
            <button
              className="px-7 border rounded-full border-text-primary cursor-pointer text-text-primary"
              onClick={() => setCount((prev) => Math.max(1, prev - 1))}
            >
              -
            </button>
            <span className="w-6 text-center text-accent">
              {String(count).padStart(2, '0')}
            </span>
            <button
              className="px-7 border rounded-full border-text-primary cursor-pointer text-text-primary"
              onClick={() => setCount((prev) => prev + 1)}
            >
              +
            </button>

            
        
        </div>

        <div className='w-full mt-5'>
        <Button className='w-full'>
            Book Ticket
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
