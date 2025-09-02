import Image, { StaticImageData } from "next/image";

interface TestimonialProps {
  name: string;
  location: string;
  avatar: string | StaticImageData;
  rating?: number;
  review: string;
  date: string;
}

export default function TestimonialCard({
  name,
  location,
  avatar,
  rating = 5,
  review,
  date,
}: TestimonialProps) {
  return (
    <div className="bg-tab-secondary rounded-2xl p-6 shadow-lg flex flex-col gap-4 w-full max-w-sm text-text-primary">
      {/* Profile */}
      <div className="flex items-center gap-4">
        <Image
          src={avatar}
          alt={name}
          width={50}
          height={50}
          className="rounded-full"
        />
        <div>
          <p className="font-semibold">{name}</p>
          <p className="text-sm text-gray">{location}</p>
        </div>
      </div>

      {/* Stars */}
      <div className="flex text-yellow-400">
        {Array.from({ length: rating }).map((_, i) => (
          <span key={i}>★</span>
        ))}
      </div>

      {/* Review */}
      <p className=" text-sm leading-relaxed italic text-gray">
      &quot;{review}&quot;
      </p>

      {/* Date */}
      <p className="text-xs">{date}</p>
    </div>
  );
}
