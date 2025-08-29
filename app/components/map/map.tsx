import { EventData } from "@/src/app/(main)/events/utils/props";
import L, { LatLngTuple } from "leaflet";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import "leaflet/dist/leaflet.css";
import { useEffect, useRef } from "react";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import showToast from "../toast/toast";

let DefaultIcon = L.icon({
  iconUrl: icon.src,
  shadowUrl: iconShadow.src,
});

L.Marker.prototype.options.icon = DefaultIcon;

export default function Map({ event }: { event: EventData }) {
  const isInitialized = useRef(false);

  useEffect(() => {
    isInitialized.current = true;
    return () => {
      isInitialized.current = false;
    };
  }, []);

  if (!isInitialized.current) {
    showToast({
      message: "Map is not available",
      type: "error",
      options: { id: "map-error" },
    });
    return null;
  }

  const defaultCoordinates: LatLngTuple = [6.5244, 3.3792];
  const eventCoordinates: LatLngTuple = event.coordinates
    ? (event.coordinates as LatLngTuple)
    : defaultCoordinates;

  return (
    <MapContainer
      className="map-instance"
      center={eventCoordinates}
      zoom={13}
      style={{ width: "100%", height: 400, zIndex: 0 }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker position={eventCoordinates} />
    </MapContainer>
  );
}
