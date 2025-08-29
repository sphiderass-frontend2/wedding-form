import { EventCardProps } from "@/src/app/(main)/events/utils/props";
import { formatDateToLongFormat } from "@/src/app/utils/lib/format";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { GoHeartFill, GoShare } from "react-icons/go";
import { LuCalendar } from "react-icons/lu";
import { SlLocationPin } from "react-icons/sl";
import Timer from "../timer/timer";

interface ExtendedProps extends EventCardProps {
  onLike?: (eventId: string) => void;
  onShare?: (eventId: string) => void;
  showButtons?: boolean;
}

const EventCard = ({
  event,
  onLike,
  onShare,
  showButtons = true,
}: ExtendedProps) => {
  const router = useRouter();

  const handleLikeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onLike) {
      onLike(event._id);
    }
  };

  const handleShareClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onShare) {
      onShare(event._id);
    }
  };

  const handleCardClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    router.push(`/events/${event._id}/details`);
  };

  return (
    <div className="card" onClick={handleCardClick}>
      <div className="ticket-mask">
        <Image
          src={event.banner || "/png/event-placeholder.png"}
          alt={event.name}
          width={600}
          height={400}
        />
      </div>

      <div className="card-text">
        <h1>{event.name}</h1>
        <div className="location">
          <SlLocationPin
            color="var(--text-color)"
            size={20}
            className="location-image"
          />
          <p>{event.venue?.[0]}</p>
        </div>
        <div className="date">
          <LuCalendar color="var(--text-color)" size={20} />
          <p>{formatDateToLongFormat(event.date.start)}</p>
        </div>
        <Timer startDate={event.date.start} />
        {showButtons && (
          <div className="card-buttons">
            <button className="button like" onClick={handleLikeClick}>
              <GoHeartFill />
              <span>{event.likeCount || 0}</span>
            </button>
            <button className="button share" onClick={handleShareClick}>
              <GoShare />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventCard;

const EventCardSkeleton = () => {
  return (
    <div className="card skeleton">
      <div className="skeleton-img" />
      <div className="card-text">
        <div className="skeleton-title" />
        <div className="location">
          <div className="skeleton-icon" />
          <div className="skeleton-text" />
        </div>
        <div className="date">
          <div className="skeleton-icon" />
          <div className="skeleton-text" />
        </div>
        <div className="skeleton-timer" />
        <div className="card-buttons">
          <div className="skeleton-button" />
          <div className="skeleton-button" />
        </div>
      </div>
    </div>
  );
};

export { EventCard, EventCardSkeleton };
