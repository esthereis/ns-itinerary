import { useContext } from "react";
import TripCard from "../common/TripCard";
import { TripContext } from "./TripContext";

export default function TripList() {
  const { trip } = useContext(TripContext);

  return (
    <div className="itinerary-container">
      {trip?.map((itinerary) => (
        <TripCard key={itinerary.checksum} path={itinerary} />
      ))}
    </div>
  );
}
