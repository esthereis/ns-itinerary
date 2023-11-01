import axios from 'axios';

const baseUrl = 'https://gateway.apiportal.ns.nl/reisinformatie-api';
const apiKey = import.meta.env.VITE_API_KEY;

export async function getStationInfo(searchTerm) {
	const response = await axios.get(`${baseUrl}/api/v2/stations`, {
		headers: {
			'x-caller-id': apiKey,
			'Cache-control': 'no-cache',
			'Ocp-Apim-Subscription-Key': apiKey,
		},
		params: {
			q: searchTerm,
		},
	});

	return response.data.payload;
}
