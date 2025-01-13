import { useContext } from "react";
import TripCard from "./TripCard";
import { TripContext } from "./TripContext";
import styles from "./TripList.module.css";

export default function TripList() {
  const { trips } = useContext(TripContext);

  return (
    <div className={trips && styles["itinerary-container"]}>
      {trips?.map((trip) => (
        <TripCard trip={trip} key={trip.key} />
      ))}
    </div>
  );
}
