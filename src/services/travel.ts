import { TrainApiResponse } from "../types/train";
import { TrainResponse } from "../types/train";
import { TripParams, TripResponse } from "../types/trip";
import { Trip } from "../types/trip";
import { axiosInstance } from "../utils/axiosInstance";

export async function getTrainInformation(
  searchTerm: string
): Promise<TrainResponse[] | undefined> {
  if (searchTerm.length >= 2) {
    const response = await axiosInstance.get<TrainApiResponse>(`/v2/stations`, {
      params: {
        q: searchTerm,
        limit: 10,
      },
    });

    const normalizedResponse = response.data.payload.map((train) => {
      return {
        trainCode: train.UICCode,
        stationName: train.namen.lang,
      } as TrainResponse;
    });

    return normalizedResponse;
  }
}

export async function getTripData({
  origin,
  destiny,
  dateTime,
  route,
}: TripParams): Promise<Trip[]> {
  const response = await axiosInstance.get(`/v3/trips`, {
    params: {
      originUicCode: origin,
      destinationUicCode: destiny,
      dateTime: dateTime,
      departure: route === "departure",
      arrival: route === "arrival",
    },
  });

  const normalizedResponse = response.data.trips.map((trip: TripResponse) => {
    return {
      key: trip.checksum,
      length: trip.legs.length,
      departureTime: trip.legs[0].origin.plannedDateTime,
      arrivalTime: trip.legs[0].destination.plannedDateTime,
      duration: trip.actualDurationInMinutes,
    } as Trip;
  });

  return normalizedResponse;
}
