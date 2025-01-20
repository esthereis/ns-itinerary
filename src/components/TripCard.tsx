import { useMemo } from "react";
import styles from "./TripCard.module.css";
import { Trip } from "../types/trip";
import { formatTime, formatMinutes } from "../utils/date";
import { FiArrowRight, FiClock } from "react-icons/fi";

type Props = {
  trip: Trip;
};

function TripCard({ trip }: Props) {
  const [departure, arrival, duration] = useMemo(() => {
    if (!trip) {
      return [];
    }
    const departureTime = formatTime(trip.departureTime);
    const arrivalTime = formatTime(trip.arrivalTime);
    const duration = formatMinutes(trip.departureTime, trip.arrivalTime);

    return [departureTime, arrivalTime, duration];
  }, [trip]);

  return (
    <div className={styles.tripCard}>
      <div className={styles.tripDetails}>
        <span className={styles.time}>{departure}</span>
        <FiArrowRight />
        <span className={styles.time}>{arrival}</span>
      </div>
      <div className={styles.tripDetails}>
        <FiClock />
        <p>{duration}</p>
      </div>
    </div>
  );
}

export default TripCard;
