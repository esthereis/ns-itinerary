import axios from "axios";

const apiKey = import.meta.env.VITE_API_KEY;

export const axiosInstance = axios.create({
  baseURL: "https://gateway.apiportal.ns.nl/reisinformatie-api/api",
  headers: {
    "x-caller-id": apiKey,
    "Cache-control": "no-cache",
    "Ocp-Apim-Subscription-Key": apiKey,
  },
});
