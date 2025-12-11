import { ReactNode, useState } from "react";
import { getTripData } from "../../services/travel";
import { Trip, TripParams } from "../../types/trip";
import { TripContext } from "./TripContext";

type TripProviderProps = {
  children: ReactNode;
};

export default function TripProvider({ children }: TripProviderProps) {
  const [trips, setTrips] = useState<Trip[]>();

  const planJourney = async ({
    originCode,
    destinyCode,
    dateTime,
    route,
  }: TripParams) => {
    const response = await getTripData({
      originCode,
      destinyCode,
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
