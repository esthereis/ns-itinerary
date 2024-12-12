export type TripParams = {
  origin: string;
  destiny: string;
  dateTime?: Date;
  route: string;
};

export type Trip = {
  key: number;
  departureTime: Date;
  arrivalTime: Date;
  duration: number;
  checksum?: number;
};

export type TripResponse = {
  checksum: number;
  actualDurationInMinutes: number;
  legs: {
    origin: { plannedDateTime: Date };
    destination: { plannedDateTime: Date };
  }[];
};
