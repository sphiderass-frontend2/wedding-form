import {
  Gallery1,
  Gallery2,
  Gallery3,
  Gallery4,
  PatternBottom,
  PatternTop,
} from "@/public/assets";
import Image from "next/image";

const Gallery = () => {
  const galleryItems = [
    {
      image: Gallery1,
      title: "Feel the VIBE",

      alt: "party-session",
    },
    {
      image: Gallery2,
      title: "Party like 99'",

      alt: "club-session",
    },
    {
      image: Gallery3,
      title: "Enjoy the Rave",

      alt: "concert-session",
    },
    {
      image: Gallery4,
      title: "Best Experience",

      alt: "festival-session",
    },
  ];

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

      <div className="flex flex-col md:flex-row items-center justify-between z-10 relative">
        <div className="space-y-8">
          <h5 className="font-bold text-xl text-text-primary">OUR GALLERY</h5>
          <h1 className="font-bold text-4xl md:text-7xl lg:text-7xl text-text-primary md:max-w-3xl">
            FEEL THE <span className="outline-text">EXPERIENCE</span>
          </h1>
        </div>
        {/* First Image with Hover Effect */}
        <div className="relative group overflow-hidden rounded-2xl">
          <Image
            src={galleryItems[0].image}
            alt={galleryItems[0].alt}
            className="transition-transform duration-500 ease-out group-hover:scale-110"
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out flex items-center justify-center">
            <div className="text-center text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 ease-out">
              <h3 className="text-2xl md:text-3xl font-bold mb-2">
                {galleryItems[0].title}
              </h3>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8 md:items-end z-10 relative">
        <div className="flex flex-col gap-8">
          {/* Second Image with Hover Effect */}
          <div className="relative group overflow-hidden rounded-2xl">
            <Image
              src={galleryItems[1].image}
              alt={galleryItems[1].alt}
              className="transition-transform duration-500 ease-out group-hover:scale-110"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out flex items-center justify-center">
              <div className="text-center text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 ease-out">
                <h3 className="text-2xl md:text-3xl font-bold mb-2">
                  {galleryItems[1].title}
                </h3>
              </div>
            </div>
          </div>

          {/* Third Image with Hover Effect */}
          <div className="relative group overflow-hidden rounded-2xl">
            <Image
              src={galleryItems[2].image}
              alt={galleryItems[2].alt}
              className="transition-transform duration-500 ease-out group-hover:scale-110"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out flex items-center justify-center">
              <div className="text-center text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 ease-out">
                <h3 className="text-2xl md:text-3xl font-bold mb-2">
                  {galleryItems[2].title}
                </h3>
              </div>
            </div>
          </div>
        </div>

        {/* Fourth Image with Hover Effect */}
        <div className="relative group overflow-hidden rounded-2xl">
          <Image
            src={galleryItems[3].image}
            alt={galleryItems[3].alt}
            className="transition-transform duration-500 ease-out group-hover:scale-110"
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out flex items-center justify-center">
            <div className="text-center text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 ease-out">
              <h3 className="text-2xl md:text-3xl font-bold mb-2">
                {galleryItems[3].title}
              </h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Gallery;
