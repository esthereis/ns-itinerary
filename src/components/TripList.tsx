import { useContext } from "react";
import TripCard from "./TripCard";
import { TripContext } from "./TripContext";

export default function TripList() {
  const { trips } = useContext(TripContext);

  return (
    <div>
      {trips?.map((trip) => (
        <TripCard trip={trip} key={trip.key} />
      ))}
    </div>
  );
}
