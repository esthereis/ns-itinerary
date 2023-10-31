import axios from 'axios';

const baseUrl = 'https://gateway.apiportal.ns.nl';
const apiKey = import.meta.env.VITE_API_KEY;

export async function getTrainInformation(searchedItem) {
  if (searchedItem.length >= 2) {
    const response = await axios.get(
      `${baseUrl}/reisinformatie-api/api/v2/stations`,
      {
        headers: {
          'x-caller-id': apiKey,
          'Cache-control': 'no-cache',
          'Ocp-Apim-Subscription-Key': apiKey
        },
        params: {
          q: searchedItem,
          limit: 10
        }
      }
    );

    return response.data.payload;
  }
}
