import { useMemo } from "react";
import styles from "./TripCard.module.css";
import { Trip } from "../types/trip";

type Props = {
  trip: Trip;
};

function TripCard({ trip }: Props) {
  const [departure, arrival, duration] = useMemo(() => {
    if (!trip) {
      return [];
    }
    const [, departureTime] = (trip.departureTime as string).split("T");
    const [, arrivalTime] = (trip.arrivalTime as string).split("T");
    const duration = trip.duration;

    return [departureTime, arrivalTime, duration];
  }, [trip]);

  return (
    <div className={styles.tripCard}>
      <span className={styles.time}>{departure}</span>
      <span>{duration}</span>
      <span className={styles.time}>{arrival}</span>
    </div>
  );
}

export default TripCard;
