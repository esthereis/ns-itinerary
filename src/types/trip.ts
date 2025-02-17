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
  legs?: Leg[];
};

export type Leg = {
  key: string;
  origin: string;
  destiny: string;
  departureTime: Date | string;
  arrivalTime: Date | string;
  duration: number;
};

export type TripResponse = {
  checksum: number;
  actualDurationInMinutes: number;
  legs: {
    origin: { plannedDateTime: string; name: string };
    destination: { plannedDateTime: string; name: string };
    duration: {value: number};
  }[];

};
