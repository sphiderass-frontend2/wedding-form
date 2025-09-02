"use client";

import React, { useEffect, useState } from "react";

interface CountdownProps {
  targetDate: string; // e.g. "2025-11-03T00:00:00"
}

const Countdown: React.FC<CountdownProps> = ({ targetDate }) => {
  const calculateTimeLeft = () => {
    const difference = +new Date(targetDate) - +new Date();
    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0 };
    }
    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / (1000 * 60)) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 60000); // update every minute

    return () => clearInterval(timer);
  }, [timeLeft]);

  return (
    <div className="flex gap-6 text-center text-xl text-text-primary">
      <div>
        <p className="bg-accent text-white py-1 rounded-md text-sm">{timeLeft.days.toString().padStart(2, "0")}</p>
        <span className="text-sm">Days</span>
      </div>
      <div>
        <p className="bg-accent text-white py-1 rounded-md text-sm">{timeLeft.hours.toString().padStart(2, "0")}</p>
        <span className="text-sm">Hours</span>
      </div>
      <div>
        <p className="bg-accent text-white py-1 rounded-md text-sm">{timeLeft.minutes.toString().padStart(2, "0")}</p>
        <span className="text-sm">Minutes</span>
      </div>
    </div>
  );
};

export default Countdown;
