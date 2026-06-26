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
});

export default function TripProvider({ children }: Props) {
  const [trips, setTrips] = useState<Trip[]>([]);

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
    <TripContext.Provider value={{ planJourney, trips }}>
      {children}
    </TripContext.Provider>
  );
}

export const useTripProvider = () => useContext(TripContext);
