import { useMemo, useState } from "react";
import styles from "./TripCard.module.css";
import { Trip } from "../types/trip";
import { formatTime, formatDuration } from "../utils/date";
import { FiArrowRight, FiClock, FiShuffle } from "react-icons/fi";

type Props = {
  trip: Trip;
};

export default function TripCard({ trip }: Props) {
  const [legsClicked, setLegsClicked] = useState<boolean>(false);

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

      {legs && (
        <div
          onClick={() => {
            setLegsClicked(!legsClicked);
          }}
          className={styles.tripDetails}
        >
          <p>{legs?.length}</p>
          <FiShuffle />
        </div>
      )}

      {legsClicked &&
        legs?.map((leg) => {
          return (
            <div>
              <p>{leg.origin}</p>
              <p>{formatTime(leg.departureTime)}</p>
              <p>{leg.destiny}</p>
              <p>{formatTime(leg.arrivalTime)}</p>
              <p>{formatDuration(leg.duration)}</p>
            </div>
          );
        })}
    </div>
  );
}
