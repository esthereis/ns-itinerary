import axios from "axios";
import { TrainApiResponse } from "../types/train";
import { TrainResponse } from "../types/train";
import { TripParams } from "../types/trip";

const baseUrl = "https://gateway.apiportal.ns.nl";
const apiKey = import.meta.env.VITE_API_KEY;

export async function getTrainInformation(
  searchTerm: string
): Promise<TrainResponse[] | undefined> {
  if (searchTerm.length >= 2) {
    const response = await axios.get<TrainApiResponse>(
      `${baseUrl}/reisinformatie-api/api/v2/stations`,
      {
        headers: {
          "x-caller-id": apiKey,
          "Cache-control": "no-cache",
          "Ocp-Apim-Subscription-Key": apiKey,
        },
        params: {
          q: searchTerm,
          limit: 10,
        },
      }
    );

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
}: TripParams) {
  const response = await axios.get(
    `${baseUrl}/reisinformatie-api/api/v3/trips`,
    {
      headers: {
        "Cache-Control": "no-cache",
        "Ocp-Apim-Subscription-Key": apiKey,
      },
      params: {
        originUicCode: origin,
        destinationUicCode: destiny,
        dateTime: dateTime.toISOString(),
        departure: route === "departure",
        arrival: route === "arrival",
      },
    }
  );
  return response.data.trips;
}
