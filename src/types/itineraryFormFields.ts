export type ItineraryFormFields = {
  origin: { trainCode: string; stationName: string };
  destiny: { trainCode: string; stationName: string };
  date: Date;
  time: Date;
};
