import { useContext } from "react";
import TripCard from "./TripCard";
import { TripContext } from "./TripContext";
import styles from "./TripList.module.css";

export default function TripList() {
  const { trips, selectedTrip } = useContext(TripContext);

  return (
    <div
      className={
        trips && selectedTrip
          ? `${styles.itineraryContainer} ${styles.transition}`
          : styles.itineraryContainer
      }
    >
      {trips?.map((trip) => (
        <TripCard trip={trip} key={trip.key} />
      ))}
    </div>
  );
}
