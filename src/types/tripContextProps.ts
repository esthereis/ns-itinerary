import { TripParams } from "./trip";
import { Trip } from "./trip";

export type TripContextProps = {
  trips: Trip[];
  planJourney: ({ origin, destiny, dateTime, route }: TripParams) => void;
};
