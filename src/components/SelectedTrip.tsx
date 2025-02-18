import styles from "./SelectedTrip.module.css";
import { Leg } from "../types/trip";
import { TripContext } from "./TripContext";
import { useContext } from "react";
import { formatTime } from "../utils/date";

export default function SelectedTrip() {
  const { selectedTrip } = useContext(TripContext);
  const legs: Leg[] | undefined = selectedTrip?.legs;

  return (
    <div className={styles.legs}>
      {legs &&
        legs.map((leg) => (
          <div key={leg.key}>
            <p>{leg.origin}</p>
            <p>{formatTime(leg.departureTime)}</p>
            <p>{formatTime(leg.arrivalTime)}</p>
            <p>{leg.duration}</p>
          </div>
        ))}
    </div>
  );
}
