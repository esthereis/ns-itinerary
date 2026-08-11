import { TripParams } from "./trip";
import { Trip } from "./trip";

export type TripContextProps = {
  trips: Trip[];
  planJourney: ({ origin, destiny, dateTime, route }: TripParams) => void;
  selectedTrip: Trip | undefined;
  setSelectedTrip: (trip: Trip) => void;
};
