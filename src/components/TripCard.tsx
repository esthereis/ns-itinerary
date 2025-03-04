import { useMemo, useContext } from "react";
import styles from "./TripCard.module.css";
import { Trip } from "../types/trip";
import { formatTime, formatDuration } from "../utils/date";
import { FiArrowRight, FiClock, FiShuffle } from "react-icons/fi";
import { TripContext } from "./TripContext";

type Props = {
  trip: Trip;
};

export default function TripCard({ trip }: Props) {
  const { setSelectedTrip } = useContext(TripContext);

  const [departure, arrival, duration, legs] = useMemo(() => {
    if (!trip) {
      return [];
    }
    const departureTime = formatTime(trip.departureTime);
    const arrivalTime = formatTime(trip.arrivalTime);
    const duration = formatDuration(trip.duration);
    const legs = trip.legs;

    return [departureTime, arrivalTime, duration, legs];
  }, [trip]);

  return (
    <div
      className={styles.tripCard}
      onClick={() => {
        setSelectedTrip(trip);
      }}
    >
      <div className={styles.tripDetails}>
        <span className={styles.time}>{departure}</span>
        <FiArrowRight />
        <span className={styles.time}>{arrival}</span>
      </div>

      <div className={styles.tripDetails}>
        <FiClock />
        <p>{duration}</p>
      </div>

      {
        <div className={styles.tripDetails}>
          <p>{legs?.length === 1 ? "0" : legs?.length}</p>
          <FiShuffle />
        </div>
      }
    </div>
  );
}
