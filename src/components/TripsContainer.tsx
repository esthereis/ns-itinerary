import { Trip } from "../types/trip";
import { useTripContext } from "./TripContext";
import TripCard from "./TripCard";
import styles from "./TripsContainer.module.css";
import { getDayOrTime } from "../utils/date";

export default function TripsContainer() {
  const { trips, setSelectedTrip } = useTripContext();

  return (
    <div className={styles["trip-container"]}>
      {trips.map((trip: Trip) => (
        <TripCard
          key={trip.key}
          arrivalTime={getDayOrTime(trip.departureTime, "time")}
          departureTime={getDayOrTime(trip.arrivalTime, "time")}
          legs={trip.legs}
          onSelect={() => setSelectedTrip(trip)}
        />
      ))}
    </div>
  );
}
