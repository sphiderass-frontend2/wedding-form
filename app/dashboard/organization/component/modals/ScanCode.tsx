'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import AtmCard from '@/public/assets/images/code.png';

import TicketGenerated from '@/public/assets/images/ticket.png';
import { Button } from '@/app/components/ui/button';

interface ScanCodeProps {
  onClose: () => void;
}

function ScanCode({ onClose }: ScanCodeProps) {

  return (
    <>

        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-black/50 p-5 font-text">
          <div className="bg-tab-primary rounded-xl w-full max-w-md p-6 shadow-lg">
           

            {/* ATM Card */}
            <div className="relative w-full h-48 rounded-xl overflow-hidden mb-6 ">
              <Image
                src={AtmCard}
                alt="ATM Card"
                fill
                className="object-cover rounded-xl "
              />
            </div>

            {/* Form */}
            <div className="space-y-4">
              <p className='text-success text-center'>Ticket Scan Successful!</p>
         
              <Button
                className="w-full bg-[#3D4ED7] hover:bg-[#2f3ec0] text-white mt-2"
                onClick={onClose}
              >
                Back
              </Button>
            </div>
          </div>
        </div>
  

      
    </>
  );
}

export default ScanCode;

