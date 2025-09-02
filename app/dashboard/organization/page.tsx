"use client";

import React from "react";
import { useRouter } from "next/navigation";

import EventCard from "./component/EventCard";
import Corona from "@/public/assets/images/corona.png";
import Neo from "@/public/assets/images/Neo.png";
import { Button } from "@/app/components/ui/button";
import Empty from "@/app/components/Empty";

const eventData = [
  {
    imageUrl: Corona,
    title: "The Corona",
    ticketCount: 100,
    eventCount: 1,
  },
  {
    imageUrl: Corona,
    title: "Creative Groove",
    ticketCount: 20,
    eventCount: 2,
  },
  {
    imageUrl: Neo,
    title: "Neo Lights",
    ticketCount: 5,
    eventCount: 1,
  },
  {
    imageUrl: Corona,
    title: "Neo Lights",
    ticketCount: 5,
    eventCount: 1,
  },
];

function Organization() {
  const router = useRouter();

  const isVerified = eventData.length > 0;
  return (
    <section className="md:p-6">
      {isVerified ? (
        <section>
          <div className="flex justify-between flex-wrap md:flex-nowrap gap-5 text-text-primary">
            <p className="text-3xl font-medium">My Event</p>

            <Button>Create Events</Button>
          </div>
          <div className="flex gap-6 flex-wrap md:flex-nowrap md:overflow-x-auto no-scrollbar mt-5">
            {eventData.map((event, index) => (
              <div key={index} className="w-full md:w-[35%] md:shrink-0">
                <EventCard {...event} />
              </div>
            ))}
          </div>
        </section>
      ) : (
        <Empty
          message="To Continue, please verify your organization"
          buttonText="Get Verified"
          onClick={() =>
            router.push("/dashboard/organization/createOrganization")
          }
        />
      )}
    </section>
  );
}

export default Organization;
