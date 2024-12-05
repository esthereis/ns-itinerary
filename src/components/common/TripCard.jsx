import { object } from "prop-types";
import { useMemo } from "react";
import styles from "../../styles/TripCard.module.css";

function TripCard({ path }) {
  const [departure, arrival, duration] = useMemo(() => {
    console.log(path);
    if (!path) {
      return [];
    }
    const length = path.legs.length;
    const [, departureTime] = path.legs[0].origin.plannedDateTime.split("T");
    const [, arrivalTime] =
      path.legs[length - 1].destination.plannedDateTime.split("T");

    const duration = path.actualDurationInMinutes;
    // const duration = pathDuration < 30 ? pathDuration : pathDuration / 60;

    return [departureTime, arrivalTime, duration];
  }, [path]);

  return (
    <div className={styles.tripCard}>
      <span className={styles.time}>{departure}</span>
      <span>{duration}</span>
      <span className={styles.time}>{arrival}</span>
      <hr />
    </div>
  );
}

export default TripCard;

TripCard.propTypes = {
  path: object.isRequired,
};
