import axios from 'axios';

const baseUrl = 'https://gateway.apiportal.ns.nl/places-api';
const apiKey = import.meta.env.VITE_API_KEY;

export async function getStationInfo(searchTerm) {
	const response = await axios.get(`${baseUrl}/v2/autosuggest`, {
		headers: {
			'x-api-key': apiKey,
			'Cache-control': 'no-cache',
			'Ocp-Apim-Subscription-Key': apiKey,
		},
		params: {
			q: searchTerm,
			type: 'stop',
		},
	});

	const [data] = response.data.payload;

	return data?.locations || [];
}
