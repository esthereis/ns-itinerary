import { createContext, useState } from "react";
import { getTripData } from "../services/travel";
import { TripParams } from "../types/trip";

export const TripContext = createContext<TripParams | null>(null);

export default function TripProvider({ children }) {
  const [trip, setTrip] = useState();

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
    setTrip(response);
  };

  return (
    <TripContext.Provider value={{ trip, planJourney }}>
      {children}
    </TripContext.Provider>
  );
}
