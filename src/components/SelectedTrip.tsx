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
    <div className={styles.trip}>
      {legs?.map((leg, index) => (
        <div key={leg.key} className={styles.leg}>
          <div className={styles.row}>
            <span className={styles.departureTime}>
              {formatTime(leg.departureTime)}
            </span>

            <div
              className={
                index !== 0
                  ? `${styles.verticalLine}`
                  : `${styles.verticalLine} ${styles.highlight}`
              }
            />

            {index === 0 && <span>{leg.origin}</span>}
          </div>

          <div className={styles.row}>
            <span>{formatTime(leg.arrivalTime)}</span>
            <div className={`${styles.verticalLine} ${styles.highlight}`} />

            <span>{leg.destiny}</span>
          </div>
        </div>
      ))}
      <FiX
        className={styles.closeIcon}
        onClick={() => setSelectedTrip(undefined)}
      />
    </div>
  );
}
