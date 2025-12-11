import { createContext, useContext } from "react";
import { Context } from "../../types/context";

export const TripContext = createContext<Context>({
  trips: undefined,
  planJourney: () => {},
});

export const useTripContext = () => useContext(TripContext);
