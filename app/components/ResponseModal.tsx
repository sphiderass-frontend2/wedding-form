import React from 'react';
import { Button } from './ui/button';

type ResponseModalProps = {
  title: string;
  message?: string;
  note?: string;
  buttonText?: string;
  onClose?: () => void;
};

const ResponseModal: React.FC<ResponseModalProps> = ({
  onClose,
  message,
  note,
  title,
  buttonText,
}) => {
  const handleGoBack = () => {
    if (onClose) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-black/50 bg-opacity-50 p-5 font-text">
      <div className="flex h-[70vh] w-full max-w-lg flex-col justify-end space-y-5 rounded-lg bg-tab-primary py-6 px-5 md:px-14 shadow-lg text-text-primary">
        <div className="grow"></div>
        <div className="flex flex-col items-center gap-5 text-center">
          <h2 className="text-3xl font-medium">{title}</h2>
          <p className='text-gray'>{message}</p>
          {note && <p className="text-gray">Note: <span className='text-black'>{note}</span> </p>}

          <div className='w-full'>
          <Button onClick={handleGoBack} className='w-full'>{buttonText}</Button>

          </div>

        </div>
      </div>
    </div>
  );
};

export default ResponseModal;
