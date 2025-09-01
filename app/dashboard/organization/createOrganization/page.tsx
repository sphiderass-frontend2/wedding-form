'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Upload } from '@/assets';
import ResponseModal from '@/components/ResponseModal';
import { useRouter } from 'next/navigation'; 
const categories = [
  'Concert',
  'Rave',
  'Conferences',
  'Fests',
  'Seminars',
  'Birthdays',
  'Party',
  'Tech Meet Ups',
  'All of the above',
];

const CreateOrganizationForm = () => {
  const [state, setState] = useState({
    banner: null as File | null,
    bannerPreview: null as string | null,
    orgName: '',
    email: '',
    description: '',
    address: '',
    selectedCategories: [] as string[],
    isDragging: false,
    successModal: false,
  });

  const router = useRouter();

  const handleBannerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setState((prev) => ({
        ...prev,
        banner: file,
        bannerPreview: URL.createObjectURL(file),
      }));
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setState((prev) => ({ ...prev, isDragging: false }));
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setState((prev) => ({
        ...prev,
        banner: file,
        bannerPreview: URL.createObjectURL(file),
      }));
    }
  };

  const handleToggleCategory = (category: string) => {
    setState((prev) => {
      const exists = prev.selectedCategories.includes(category);
      return {
        ...prev,
        selectedCategories: exists
          ? prev.selectedCategories.filter((c) => c !== category)
          : [...prev.selectedCategories, category],
      };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setState((prev) => ({ ...prev, successModal: true }));
  };

  const handleGoToDetails = () => {
    setState((prev) => ({ ...prev, successModal: false }));

    const details = {
      imageUrl: state.bannerPreview,
      organizationName: state.orgName,
      email: state.email,
      address: state.address,
      description: state.description,
      categories: state.selectedCategories,
    };

    localStorage.setItem('orgDetails', JSON.stringify(details));
    router.push('/dashboard/organization/createOrganization/detail');
  };

  return (
    <section className="bg-tab-primary text-text-primary px-8 py-12 rounded-2xl">
      <form className="space-y-10" onSubmit={handleSubmit}>
        {/* Banner Upload */}
        <div
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          onDragEnter={() =>
            setState((prev) => ({ ...prev, isDragging: true }))
          }
          onDragLeave={() =>
            setState((prev) => ({ ...prev, isDragging: false }))
          }
          className={`border border-dashed bg-tab-secondary border-[#D7D7D7] rounded-lg p-4 text-center transition-colors relative ${
            state.isDragging ? 'bg-blue-50 border-blue-500' : ''
          }`}
        >
          {state.banner && state.bannerPreview ? (
            <div className="relative w-full">
              <Image
                src={state.bannerPreview}
                alt="Preview"
                width={0}
                height={0}
                sizes="100vw"
                className="w-full h-auto rounded-md object-cover"
              />
              <button
                type="button"
                onClick={() =>
                  setState((prev) => ({
                    ...prev,
                    banner: null,
                    bannerPreview: null,
                  }))
                }
                className="absolute top-2 right-2 bg-white text-black rounded-full p-1 shadow"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
              <p className="text-sm text-gray-600 mt-2">{state.banner.name}</p>
            </div>
          ) : (
            <div className="flex justify-center items-center flex-col gap-3 py-14">
              <Image src={Upload} alt="upload" />
              <p className="text-gray-600 text-sm">Drop image here</p>
              <p className="text-sm text-gray-400">
                Supported format: PNG, JPG
              </p>
              <label className="cursor-pointer text-blue-500 block">
                OR <span className="underline">Browse Files</span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleBannerChange}
                />
              </label>
            </div>
          )}
        </div>

        {/* Organization Name */}
        <div>
          <label className="block font-medium mb-2 text-xl">
            Organization Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={state.orgName}
            onChange={(e) =>
              setState((prev) => ({ ...prev, orgName: e.target.value }))
            }
            placeholder="Input your organization name"
            className="w-full border border-[#00000066] rounded-full outline-none px-4 py-3"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block font-medium mb-2 text-xl">
            Email Address <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            value={state.email}
            onChange={(e) =>
              setState((prev) => ({ ...prev, email: e.target.value }))
            }
            placeholder="Input email address"
            className="w-full border border-[#00000066] rounded-full outline-none px-4 py-3"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block font-medium mb-2 text-xl">
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            rows={4}
            value={state.description}
            onChange={(e) =>
              setState((prev) => ({ ...prev, description: e.target.value }))
            }
            placeholder="Input brief description of your organization"
            className="w-full border border-[#00000066] rounded-2xl outline-none px-4 py-3 resize-none h-[40vh]"
          />
        </div>

        {/* Address */}
        <div>
          <label className="block font-medium mb-2 text-xl">
            Business Address <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={state.address}
            onChange={(e) =>
              setState((prev) => ({ ...prev, address: e.target.value }))
            }
            placeholder="Input address of your business"
            className="w-full border border-[#00000066] rounded-full outline-none px-4 py-3"
          />
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-3">
          {categories.map((cat) => (
            <button
              type="button"
              key={cat}
              className={`px-5 font-medium py-3 border rounded-full text-sm cursor-pointer ${
                state.selectedCategories.includes(cat)
                  ? 'bg-accent text-white'
                  : 'text-blue-600 border-accent border-[2px]'
              }`}
              onClick={() => handleToggleCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Submit Button */}
        <div className="pt-4 flex justify-end">
          <Button type="submit">Done</Button>
        </div>
      </form>

      {/* Modal */}
      {state.successModal && (
        <ResponseModal
          title="Verified!"
          message="Your organization has been successfully verified"
          buttonText="Done"
          onClose={handleGoToDetails}
        />
      )}
    </section>
  );
};

export default CreateOrganizationForm;



