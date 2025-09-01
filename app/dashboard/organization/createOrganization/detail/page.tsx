'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { SMsStar, Building } from '@/assets';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

interface OrgDetails {
  imageUrl: string;
  organizationName: string;
  email: string;
  address: string;
  description: string;
  categories: string[];
}

const Detail: React.FC = () => {
  const [details, setDetails] = useState<OrgDetails | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedDetails = localStorage.getItem('orgDetails');
    if (storedDetails) {
      setDetails(JSON.parse(storedDetails));
    }
  }, []);

  const handleFinish = () => {
    localStorage.removeItem('orgDetails');
    router.push('/dashboard/organization'); 
  };

  if (!details) {
    return (
      <div className="text-center mt-20 text-gray-500 text-lg">
        No organization details found.
      </div>
    );
  }

  return (
    <div className=" bg-tab-primary p-6 rounded-xl shadow-md space-y-5 text-text-primary">
      <div className="font-medium mb-2 text-xl text-accent">Brand Image</div>
      <div className="w-full rounded-xl overflow-hidden mb-6">
        <img
          src={details.imageUrl}
          alt="Brand"
          className="w-full h-auto object-cover"
        />
      </div>

      <div className="mb-4 pb-1 text-xl border-[#00000099] border-b-2">
        <p className=" font-medium">
          Organization Name:{' '}
          <span className="text-accent font-semibold">
            {details.organizationName}
          </span>
        </p>
      </div>

      <div className="mb-4 space-y-3 text-xl ">
        <p  className=" font-medium mb-2 text-accent">Basic Information:</p>
        <p className="flex items-center flex-wrap gap-3 text-gray ">
            <p className='bg-accent p-2 rounded-xl'>
                <Image src={SMsStar} alt='sms' />
            </p>
          Email Address:  <span className='text-text-primary'>{details.email}</span>
        </p>
        <p className="flex items-center flex-wrap gap-3 text-gray ">
            <p className='bg-accent p-2 rounded-xl'>
                <Image src={Building} alt='sms' />
            </p> Business Address: <span>{details.address}</span>
        </p>
      </div>

      <div className="mb-4 text-xl">
        <p  className="block font-medium mb-2 text-accent">Description</p>
        <p className=" text-text-primary whitespace-pre-line text-base">
          {details.description}
        </p>
      </div>

      <div className="mb-6">
        <p  className="block font-medium mb-2 text-xl text-accent">Categories:</p>
        <div className="flex flex-wrap gap-2">
          {details.categories.map((cat, i) => (
            <span
              key={i}
              className="bg-accent text-white px-4 py-3 font-normal rounded-full"
            >
              {cat}
            </span>
          ))}
        </div>
      </div>

      <div className="flex justify-end">
        <Button
          onClick={handleFinish}
        >
          Finish
        </Button>
      </div>
    </div>
  );
};

export default Detail;
