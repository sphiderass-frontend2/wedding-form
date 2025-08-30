"use client";

import { useState } from "react";
import Image from "next/image";
import { Upload } from "@/public/assets";

interface Props {
  formData: any;
  onChange: (field: string, value: File | string) => void;
}

export default function Step3({ formData, onChange }: Props) {
  const [state, setState] = useState<{
    isDragging: boolean;
    banner: File | null;
    bannerPreview: string | null;
  }>({
    isDragging: false,
    banner: null,
    bannerPreview: null,
  });

  // Handle file selection
  const handleBannerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setState((prev) => ({
        ...prev,
        banner: file,
        bannerPreview: previewUrl,
      }));
      onChange("banner", file);
    }
  };

  // Handle drag & drop
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setState({
        isDragging: false,
        banner: file,
        bannerPreview: previewUrl,
      });
      onChange("banner", file);
    }
  };

  return (
    <section>
      <h1 className="text-accent text-2xl font-semibold">Event Invitation Card</h1>

      <div className="mt-5 mb-5">
        <label className="mb-3 block text-text-primary">
        Upload the Invitation Card of this Event        </label>

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
            state.isDragging ? "bg-blue-50 border-blue-500" : ""
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
                ✕
              </button>
              <p className="text-sm text-gray-600 mt-2">{state.banner.name}</p>
            </div>
          ) : (
            <div className="flex justify-center items-center flex-col gap-3 py-14">
              <Image src={Upload} alt="upload" />
              <p className="text-gray-600 text-sm">Drop image here</p>
              <p className="text-sm text-gray-400">Supported format: PNG, JPG</p>
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
      </div>
    </section>
  );
}

