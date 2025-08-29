import React from 'react';
import Image, { StaticImageData } from 'next/image';
import DefaultImage from '@/public/assets/images/empty.png';
import { Button } from './ui/button';

interface EmptyProps {
  message?: string;
  buttonText?: string;
  onClick?: () => void;
  image?: StaticImageData;
}

const Empty: React.FC<EmptyProps> = ({
  message = 'You currently do not have any upcoming event.',
  buttonText = 'Click Create Event',
  onClick,
  image = DefaultImage,
}) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center space-y-6">
      <Image src={image} alt="empty" className="mx-auto" />
      <p className="text-2xl font-medium text-[var(--gray)]">{message}</p>
      {onClick && (
        <Button onClick={onClick}>
          {buttonText}
        </Button>
      )}
    </div>
  );
};

export default Empty;
