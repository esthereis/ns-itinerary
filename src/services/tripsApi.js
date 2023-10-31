import axios from 'axios';

// const origin = '8400282'; //den haag
// const destiny = '8400426'; //Maastricht Randwyck
const time = '2023-11-01T21:00:00+01:00';

const baseUrl = 'https://gateway.apiportal.ns.nl';
const apiKey = import.meta.env.VITE_API_KEY;

export async function getTripData(origin, destiny) {
  const response = await axios.get(
    `${baseUrl}/reisinformatie-api/api/v3/trips`,
    {
      headers: {
        'Cache-Control': 'no-cache',
        'Ocp-Apim-Subscription-Key': apiKey
      },
      params: {
        originUicCode: origin,
        destinationUicCode: destiny,
        dateTime: time
      }
    }
  );

  return response.data;
}
