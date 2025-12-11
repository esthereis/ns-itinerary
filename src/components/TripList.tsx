import TripCard from "./TripCard";
import { useTripContext } from "./context/TripContext";

export default function TripList() {
  const { trips } = useTripContext();

  return (
    <div>
      {trips?.map((trip) => (
        <TripCard trip={trip} key={trip.key} />
      ))}
    </div>
  );
}
