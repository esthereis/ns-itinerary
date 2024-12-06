import { createContext, useState } from "react";
import { getTripData } from "../../services/travel";

export const TripContext = createContext();

export default function TripProvider({ children }) {
  const [trip, setTrip] = useState();

  const planJourney = async ({ origin, destiny, dateTime, route }) => {
    const date = dateTime.toISOString();
    const response = await getTripData({
      origin,
      destiny,
      date,
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
