import { createContext, ReactNode, useState } from "react";
import { getTripData } from "../services/travel";
import { TripParams } from "../types/trip";
import { Trip } from "../types/trip";
import { Context } from "../types/context";

export const TripContext = createContext<Context>({
  trips: undefined,
  planJourney: () => {
    return;
  },
});

type Props = {
  children: ReactNode;
};

export default function TripProvider({ children }: Props) {
  const [trips, setTrips] = useState<Trip[]>();

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
    <TripContext.Provider value={{ trips, planJourney }}>
      {children}
    </TripContext.Provider>
  );
}
