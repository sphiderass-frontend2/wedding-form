"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface Props {
  label?: string;
  options: string[];
  value: string;
  onChange?: (value: string) => void;
}

export default function CategoryDropdown({
  label,
  options,
  value,
  onChange,
}: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative w-full">
      {label && (
        <label className="block font-semibold text-xl text-text-primary mb-2">
          {label}
        </label>
      )}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full border border-text-primary/50 py-3 px-4 rounded-xl text-left flex items-center justify-between text-text-primary"
      >
        {value || "Select a category"}
        <ChevronDown
          className={`h-5 w-5 transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <ul className="absolute z-50 mt-1 w-full bg-tab-primary shadow-lg rounded-xl   max-h-60 overflow-y-auto no-scrollbar">
          {options.map((option) => (
            <li
              key={option}
              className={`px-4 py-3 cursor-pointer hover:bg-accent hover:text-white ${
                option === value ? "bg-accent text-white" : "text-text-primary"
              }`}
              onClick={() => {
                onChange?.(option);
                setOpen(false);
              }}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
