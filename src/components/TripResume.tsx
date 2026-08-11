import { Trip } from "../types/trip";
import { getDayOrTime } from "../utils/date";
import { useTripContext } from "./TripContext";
import { FaRegDotCircle } from "react-icons/fa";
import styles from "./TripResume.module.css";

function VerticalLine() {
  return (
    <div className={styles["checkpoint-wrapper"]}>
      <FaRegDotCircle />
      <div className={styles["vertical-line"]} />
    </div>
  );
}

export default function TripResume() {
  const { selectedTrip, trips } = useTripContext();

  const referenceTrip: Trip = selectedTrip ?? trips[0];

  if (!referenceTrip) {
    return;
  }

  return (
    <div className={styles["trip-details-card"]}>
      <div className={styles["time-line"]}>
        <div className={styles.row}>
          <span>{getDayOrTime(referenceTrip.arrivalTime, "time")}</span>
          <VerticalLine />
        </div>

        {referenceTrip.legs?.map((leg) => (
          <div className={styles.row}>
            <span key={leg.key}>{getDayOrTime(leg.departureTime, "time")}</span>
            <VerticalLine />
          </div>
        ))}

        <div className={styles.row}>
          <span>{getDayOrTime(referenceTrip.departureTime, "time")}</span>
          <FaRegDotCircle />
        </div>
      </div>
    </div>
  );
}
