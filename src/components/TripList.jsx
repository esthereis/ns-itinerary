import { useContext } from "react";
import TripCard from "./TripCard";
import { TripContext } from "./TripContext";
import styles from "./TripList.module.css";

export default function TripList() {
  const { trip } = useContext(TripContext);

  return (
    <div className={trip && styles["itinerary-container"]}>
      {trip?.map((itinerary) => (
        <TripCard key={itinerary.checksum} path={itinerary} />
      ))}
    </div>
  );
}
