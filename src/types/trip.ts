export type TripParams = {
  origin: string;
  destiny: string;
  dateTime?: Date;
  route: string;
};

export type Trip = {
  key: number;
  departureTime: Date | string;
  arrivalTime: Date | string;
  duration: number;
  checksum?: number;
};

export type TripResponse = {
  checksum: number;
  actualDurationInMinutes: number;
  legs: {
    origin: { plannedDateTime: string };
    destination: { plannedDateTime: string };
  }[];
};
