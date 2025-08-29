"use client";

import { ArrowFilled, PatternBottom, PatternTop, Quote } from "@/public/assets";
import Image from "next/image";
import { useState, useEffect } from "react";

interface Testimonial {
  text: string;
  name: string;
  location: string;
  bgImage: string;
}

const Testimonial = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const testimonials: Testimonial[] = [
    {
      text: "Booking tickets used to be a hassle now it’s a breeze. I discovered new events, paid in seconds, and got my ticket instantly. Love it!",
      name: "SARAH WILLIAMS",
      location: "LAGOS, NIGERIA",
      bgImage: "/curated-events.jpg",
    },
    {
      text: "I planned a surprise outing for my friends, and this platform made it seamless. No queues, no stress just click, pay, and enjoy",
      name: "DAVID OJO",
      location: "LAGOS, NIGERIA",
      bgImage: "/quality-assurance.jpg",
    },
    {
      text: "Selling tickets for my event was so easy. I listed in minutes, got real-time updates, and even tracked my sales. This platform is a game-changer!",
      name: "KEMI ADEYINKA",
      location: "LAGOS, NIGERIA",
      bgImage: "/semaless-experience.jpg",
    },
    {
      text: "I used to miss out on tickets. Not anymore. I get alerts for new events, and checkout takes less than a minute. It’s everything I needed",
      name: "DAVID OKEKE",
      location: "TOBI SHAFT",
      bgImage: "/curated-events.jpg",
    },
  ];

  // Auto-advance slides
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    }, 4000); // Change slide every 4 seconds (faster)

    return () => clearInterval(interval);
  }, [testimonials.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  return (
    <section className="p-4 sm:p-6 md:py-40 md:px-8 bg-background h-auto relative w-full space-y-8 transition-colors duration-300">
      {/* Vector Graphics */}
      <Image
        className="absolute top-0 right-0 z-0"
        src={PatternTop}
        alt="pattern"
      />
      <Image
        className="absolute bottom-0 left-0 z-0"
        src={PatternBottom}
        alt="pattern"
      />

      {/* Header */}
      <div className="flex flex-col items-center justify-center z-10 relative text-center">
        <div className="space-y-8">
          <h5 className="font-bold text-xl text-text-primary">TESTIMONIALS</h5>
          <h1 className="font-bold text-4xl md:text-7xl lg:text-7xl text-text-primary md:max-w-4xl">
            DON'T TAKE OUR <span className="outline-text">WORD FOR IT</span>
          </h1>
        </div>
      </div>

      {/* Testimonial Section */}
      <div className="relative z-10 flex gap-4 flex-col md:flex-row-reverse items-center justify-center ">
        {/* Background Image Slideshow Container */}
        <div className="w-full md:w-[1000px] h-80 md:h-96 lg:h-[500px] rounded-4xl overflow-hidden relative">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-all duration-1500 ease-in-out ${
                index === currentSlide
                  ? "opacity-100 scale-100"
                  : "opacity-0 scale-105"
              }`}
            >
              <div
                className="w-full h-full bg-cover bg-center bg-no-repeat relative"
                style={{ backgroundImage: `url(${testimonial.bgImage})` }}
              >
                {/* Dark overlay for better text readability */}
                <div className="absolute inset-0 bg-gradient-to-br from-black/40 to-black/60"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Testimonial Card - Overlaid on slideshow */}
        <div className="rounded-4xl p-6 text-white z-20 min-h-[400px] flex flex-col gap-6 justify-between bg-card-background dark:bg-gray-800 md:-mr-[16rem] transition-colors duration-300 md:w-[900px]">
          {/* Quote Icon */}
          <span>
            <Image src={Quote} alt="" width={80} height={100} />
          </span>

          {/* Testimonial Text */}
          <p className="text-base md:text-lg font-light leading-relaxed flex-grow max-w-xl">
            {testimonials[currentSlide].text}
          </p>

          <div className="flex justify-between items-center">
            {/* Author Info */}
            <div className="space-y-1 mb-6">
              <h3 className="font-bold text-lg md:text-xl">
                {testimonials[currentSlide].name}
              </h3>
              <p className="text-xs text-white">
                {testimonials[currentSlide].location}
              </p>
            </div>

            {/* Navigation Buttons */}
            <div className="flex gap-3">
              <button
                onClick={prevSlide}
                className="w-15 h-15   rounded-lg flex items-center justify-center border-gray border-2 cursor-pointer"
              >
                <span>
                  <Image src={ArrowFilled} width={30} alt="arrow" height={50} />
                </span>
              </button>
              <button
                onClick={nextSlide}
                className="w-15 h-15   rounded-lg flex items-center justify-center border-gray border-2 cursor-pointer"
              >
                <span>
                  <Image
                    className="rotate-180"
                    width={30}
                    src={ArrowFilled}
                    alt="arrow"
                    height={50}
                  />
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Slide Indicators */}
      {/* <div className="flex justify-center gap-2 mt-8">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? "bg-blue-600 scale-125"
                : "bg-gray-300 hover:bg-gray-400"
            }`}
          />
        ))}
      </div> */}
    </section>
  );
};

export default Testimonial;
