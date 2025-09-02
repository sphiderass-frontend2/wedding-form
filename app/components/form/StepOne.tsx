// app/components/steps/Step1.tsx
"use client";

import InputField from "../InputField";
import CategoryDropdown from "../CategoryDropdown";
import { Button } from "../ui/button";
import { FormData } from "@/app/store/useWeddingStore";

interface Props {
  formData: FormData;
  onChange: (field: string, value: string) => void;
}

const categories = ["Concert", "Rave", "Wedding", "Fest", "Birthday"];

export default function Step1({ formData, onChange }: Props) {
  return (
    <div className="mt-2 bg-tab-primary p-5">
      <h1 className="text-accent text-2xl font-semibold">Events Info</h1>
      <p className="mt-2 text-accent text-xl">Get Started With Your Event</p>

      <div className="space-y-6 mt-4">
        <InputField
          label="Name of Event"
          required
          placeholder="Enter event name"
          value={formData.name}
          onChange={(v) => onChange("name", v)}
        />

        <div>
          <label className="font-semibold text-xl text-text-primary ">
            Event Description*
          </label>
          <textarea
            placeholder="Enter event description"
            value={formData.description}
            onChange={(e) => onChange("description", e.target.value)}
            className="w-full border border-text-primary/50 py-3 px-4 rounded-2xl text-text-primary placeholder:text-gray outline-none h-64 resize-none mt-3"
          />
        </div>

        <CategoryDropdown
          label="Category"
          options={categories}
          value={formData.category}
          onChange={(val) => onChange("category", val)}
        />

        <InputField
          label="Number of Attendees"
          placeholder="Enter Number of Attendees"
          value={formData.numberOfAttendees.toString()}
          onChange={(v) => onChange("numberOfAttendees", v)}
        />

        <div className="space-y-5">
          <h1 className="text-accent text-2xl font-semibold">Date and Time</h1>

          <div className=" w-full md:w-[40%] xl:w-[20%] text-text-primary">
            <label>Date</label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => onChange("date", e.target.value)}
              className="w-full border border-text-primary/50 py-3 px-4 rounded-2xl text-text-primary placeholder:text-gray outline-none mt-3"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-8 md:w-[60%] text-text-primary ">
            <div className="">
              <label>Start Time</label>
              <input
                type="time"
                value={formData.startTime}
                onChange={(e) => onChange("startTime", e.target.value)}
                className="w-full border border-text-primary/50 py-3 px-4 rounded-2xl text-text-primary placeholder:text-gray outline-none mt-3"
              />
            </div>
            <div className="">
              <label>End Time</label>
              <input
                type="time"
                value={formData.endTime}
                onChange={(e) => onChange("endTime", e.target.value)}
                className="w-full border border-text-primary/50 py-3 px-4 rounded-2xl text-text-primary placeholder:text-gray outline-none mt-3"
              />
            </div>
          </div>
        </div>

        <div className="space-y-5">
          <h1 className="text-accent text-2xl font-semibold">
            Venue Details *
          </h1>

          <InputField
            label="Venue"
            required
            placeholder="Enter Venue"
            value={formData.venue}
            onChange={(v) => onChange("venue", v)}
          />

          <Button className="font-semibold text-base">
            Add Map Live Location
          </Button>

          <InputField
            label="Address"
            placeholder="Enter Address"
            value={formData.address}
            onChange={(v) => onChange("address", v)}
          />
        </div>
      </div>
    </div>
  );
}
