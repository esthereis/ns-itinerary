import styles from "./SelectedTrip.module.css";
import { Leg } from "../types/trip";
import { TripContext } from "./TripContext";
import { useContext } from "react";
import { formatTime } from "../utils/date";
import { FiX } from "react-icons/fi";

export default function SelectedTrip() {
  const { selectedTrip, setSelectedTrip } = useContext(TripContext);
  const legs: Leg[] | undefined = selectedTrip?.legs;

  if (!selectedTrip) {
    return null;
  }

  return (
    <div className={styles.legs}>
      {legs?.map((leg) => (
        <div key={leg.key}>
          <p>{leg.origin}</p>
          <p>{formatTime(leg.departureTime)}</p>
          <p>{formatTime(leg.arrivalTime)}</p>
        </div>
      ))}
      <FiX
        className={styles.closeIcon}
        onClick={() => setSelectedTrip(undefined)}
      />
    </div>
  );
}
