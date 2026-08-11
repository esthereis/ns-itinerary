import { createContext, ReactNode, useContext, useState } from "react";
import { getTripData } from "../services/travel";
import { TripParams } from "../types/trip";
import type { Trip } from "../types/trip";
import { TripContextProps } from "../types/tripContextProps";

type Props = {
  children: ReactNode;
};

export const TripContext = createContext<TripContextProps>({
  trips: [],
  planJourney: () => {},
  selectedTrip: undefined,
  setSelectedTrip: () => {},
});

export default function TripProvider({ children }: Props) {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [selectedTrip, setSelectedTrip] = useState<Trip>();

  const planJourney = async ({
    origin,
    destiny,
    dateTime,
    route,
  }: TripParams) => {
    const response = await getTripData({
      origin,
      destiny,
      dateTime,
      route,
    });
    setTrips(response);
  };

  return (
    <TripContext.Provider
      value={{ planJourney, trips, selectedTrip, setSelectedTrip }}
    >
      {children}
    </TripContext.Provider>
  );
}

export const useTripContext = () => useContext(TripContext);
