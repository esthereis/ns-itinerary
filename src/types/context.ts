import { Dispatch, SetStateAction } from "react";
import { TripParams } from "./trip";
import { Trip } from "./trip";

export type Context = {
  trips?: Trip[];
  planJourney: ({ origin, destiny, dateTime, route }: TripParams) => void;
  selectedTrip?: Trip;
  setSelectedTrip: Dispatch<SetStateAction<Trip | undefined>>;
};
