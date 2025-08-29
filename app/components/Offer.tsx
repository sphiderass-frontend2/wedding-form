import {
  CupIcon,
  MessageIcon,
  PatternBottom,
  PatternTop,
  PersonIcon,
} from "@/public/assets";
import Image from "next/image";

const Offer = () => {
  return (
    <section className="p-4 sm:p-6 md:py-40 md:px-8 bg-background h-auto relative w-full space-y-8 transition-colors duration-300">
      {/* Vector Graphics */}
      <Image
        className="absolute top-0 right-0 z-0"
        src={PatternTop}
        alt="pattern"
      />
      <Image
        className="absolute bottom-0 left-0 z-50"
        src={PatternBottom}
        alt="pattern"
      />

      {/* Header */}
      <div className="flex flex-col md:flex-row items-center justify-between z-10 relative">
        <div className="space-y-8">
          <h5 className="font-bold text-xl text-text-primary">WHY CHOOSE US</h5>
          <h1 className="font-bold text-4xl md:text-7xl lg:text-7xl text-text-primary md:max-w-3xl">
            WHAT WE OFFER AT <span className="outline-text">RICHLIST</span>
          </h1>
        </div>
        {/* Image */}
        {/* <Image src={Party} alt="party-session" /> */}
        <p className="text-sm md:text-lg font-normal text-gray max-w-md">
          Discover exciting events tailored to your interests, book your tickets
          in seconds with secure payment, and receive your e-ticket instantly.
          Just show up and enjoy.{" "}
          <span className="font-bold text-text-primary">Richlist</span> takes
          care of the rest.
        </p>
      </div>

      <div className="md:mb-20 mb-14 grid grid-cols-1 md:grid-cols-2 gap-8 ">
        <div className="flex flex-col gap-4 text-white p-10 rounded-4xl  bg-[url('/curated-events.jpg')] bg-cover bg-center bg-no-repeat relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#000000BF] to-[#000000BF] opacity-75"></div>
          <div className="relative z-10 flex flex-col gap-4">
            <Image src={MessageIcon} alt="icon" width={80} height={100} />

            <h2 className="font-semibold text-xl md:text-2xl text-white">
              Curated Events
            </h2>
            <p className="text-xm text-white font-light">
              Handpicked events to connect you with unique experiences, ensuring
              you discover something new and exciting.
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-4 text-white p-10 rounded-4xl  bg-[url('/quality-assurance.jpg')] bg-cover bg-center bg-no-repeat relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#000000BF] to-[#000000BF] opacity-75"></div>
          <div className="relative z-10 flex flex-col gap-4">
            <Image src={PersonIcon} alt="icon" width={80} height={100} />

            <h2 className="font-semibold text-xl md:text-2xl text-white">
              Quality Assurance
            </h2>
            <p className="text-xm text-white font-light">
              We prioritize quality in everything we do, ensuring that every
              event experience meets the highest standards.
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-4 text-white p-10 rounded-4xl  bg-[url('/semaless-experience.jpg')] bg-cover bg-center bg-no-repeat relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#000000BF] to-[#000000BF] opacity-75"></div>
          <div className="relative z-10 flex flex-col gap-4">
            <Image src={CupIcon} alt="icon" width={80} height={100} />

            <h2 className="font-semibold text-xl md:text-2xl text-white">
              Seamless Experience
            </h2>
            <p className="text-xm text-white font-light">
              From event planning to ticket booking and payment, we streamline
              the entire process making it hassle free for you
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-6 text-white p-10 rounded-4xl  bg-[url('/curated-events.jpg')] bg-cover bg-center bg-no-repeat relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#000000BF] to-[#000000BF] opacity-75"></div>
          <div className="relative z-10 flex flex-col gap-4">
            <Image src={MessageIcon} alt="icon" width={80} height={100} />

            <h2 className="font-semibold text-xl md:text-2xl text-white">
              Seamless Experience
            </h2>
            <p className="text-xm text-white font-light">
              From event planning to ticket booking and payment, we streamline
              the entire process making it hassle free for you
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Offer;
