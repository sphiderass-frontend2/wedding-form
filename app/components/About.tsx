import {
  CheckCircle,
  Party,
  Party2,
  PatternBottom,
  PatternTop,
  PhoneNoise,
} from "@/public/assets";
import Image from "next/image";

interface About {
  id: number;
  description: string;
}

const Abouts: About[] = [
  {
    id: 1,
    description:
      "Effortlessly organize your outings with our intuitive platform that allows you to easily create a personalized event calendar tailored to your interests and schedule.",
  },
  {
    id: 2,
    description:
      "Uncover exciting events in your area that match your passions and preferences, ensuring you never miss out.",
  },
  {
    id: 3,
    description:
      "Secure your spot with just a few clicks, with instant access to your tickets and confirmation, allowing you to focus on enjoying the experience.",
  },

  {
    id: 4,
    description:
      "Secure your spot with just a few clicks, with instant access to your tickets and confirmation, allowing you to focus on enjoying the experience.",
  },
];

const About = () => {
  return (
    <section className="p-4 sm:p-6 md:py-10 md:px-8 bg-background h-auto relative w-full space-y-8 transition-colors duration-300">
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
          <h5 className="font-bold text-xl text-text-primary">WHO WE ARE</h5>
          <h1 className="font-bold text-4xl md:text-7xl lg:text-7xl text-text-primary">
            ABOUT <span className="outline-text">US</span>
          </h1>
          <p className="text-sm md:text-lg font-normal text-text-primary/60  max-w-lg">
            At RichList, We believe every event creates unforgettable memories.
            Our goal is to simplify event planning, making it enjoyable and
            hassle-free
          </p>
        </div>
        {/* Image */}
        <Image src={Party} alt="party-session" />
      </div>

      <div className="flex flex-col-reverse md:flex-row items-end gap-8 justify-between md:-mt-16 md:z-20 relative">
        {/* ... */}

        <Image src={PhoneNoise} alt="party" />
        <Image src={Party2} alt="party" />

        <div className="space-y-12 bg-card-background text-gray dark:text-gray-200 py-14 px-12 rounded-4xl md:w-[600px] transition-colors duration-300">
          {Abouts &&
            Abouts.map((about) => (
              <div key={about.id} className="flex gap-6 items-center">
                <Image src={CheckCircle} alt="icon" width={40} height={50} />

                <p className=" text-sm font-normal max-w-lg">
                  {about.description}
                </p>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default About;
