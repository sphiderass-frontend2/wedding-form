import Image from "next/image";
import Nav from "./Nav";
import { Button } from "./ui/button";
import {
  Avatar1,
  Avatar2,
  Avatar3,
  CircleArrow,
  FacebookImage,
  GoogleImage,
  PinterestImage,
  TwitchImage,
  YoutubeImage,
} from "@/public/assets";

const Hero = () => {
  return (
    <main className="p-0 sm:p-6 md:py-10 md:px-8  sm:bg-background">
      <div className="md:rounded-4xl hero  p-4 md:py-10 flex flex-col items-center justify-between text-center gap-8">
        <Nav />

        <div className="flex flex-col items-center justify-center gap-4 flex-wrap">
          <h1 className="font-semibold text-4xl md:text-7xl lg:text-7xl text-white">
            Your Ultimate Shortcut
          </h1>
          <div className="flex items-center justify-center gap-2 flex-wrap">
            <h1 className="font-semibold text-4xl md:text-7xl lg:text-7xl text-white">
              To Effortless
            </h1>
            <span className="pill w-[150px] h-[70px] md:w-[260px] md:h-[90px]"></span>
            <h1 className="font-semibold text-4xl md:text-7xl lg:text-7xl text-white">
              Event Planning
            </h1>
          </div>

          <p className="text-white font-normal text-base md:text-lg lg:text-xl max-w-3xl">
            Find the Vibe. Book the Experience. Live the Moment. Discover events
            you’ll love, lock in your spot instantly, and make every outing
            unforgettable
          </p>

          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Button className="font-medium text-sm md:text-lg flex gap-2 items-center">
              Get Started{" "}
              <span>
                <Image src={CircleArrow} alt="icon" />
              </span>
            </Button>

            <div className="flex items-center justify-center relative">
              <Image
                className="transition-all duration-500 hover:scale-105"
                src={Avatar1}
                alt="avatar"
              />
              <Image
                className="-ml-3 transition-all duration-500 hover:scale-105"
                src={Avatar2}
                alt="avatar"
              />
              <Image
                className="-ml-3 transition-all duration-500 hover:scale-105"
                src={Avatar3}
                alt="avatar"
              />
            </div>

            <p className="text-white font-normal text-base md:text-lg lg:text-xl max-w-3xl">
              Join <span className="font-bold">1000+</span> Users and enjoy your
              experience
            </p>
          </div>
        </div>

        <div className="flex items-center justify-center gap-14 flex-wrap">
          <Image src={GoogleImage} alt="socials" />
          <Image src={FacebookImage} alt="socials" />
          <Image src={YoutubeImage} alt="socials" />
          <Image src={PinterestImage} alt="socials" />
          <Image src={TwitchImage} alt="socials" />
        </div>
      </div>
    </main>
  );
};

export default Hero;
