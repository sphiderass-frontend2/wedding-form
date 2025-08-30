"use client";

import React from "react";

export default function InputField({
  label,
  required,
  placeholder,
  value,
  onChange,
}: {
  label: string;
  required?: boolean;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <h2 className="text-xl font-medium mb-2 text-text-primary">
        {label} {required && "*"}
      </h2>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border border-text-primary/50 py-3 px-4 rounded-full text-text-primary placeholder:text-gray outline-none"
      />
    </div>
  );
}
