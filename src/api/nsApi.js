import axios from 'axios';

const apiKey = 'e3242c1662f1418698b81b52e14e50e0';

const nsApi = axios.create({
  method: 'get',
  baseURL: 'https://gateway.apiportal.ns.nl/virtual-train-api/api/v1/trein',
  // parameters: {
  //   ids: 'value'
  // },
  // authorizarion: {
  //   'subscription-key': 'Primary: NS trains datas'
  // },
  headers: {
    'x-api-key': apiKey,
    'Cache-control': 'no-cache',
    'Ocp-Apim-Subscription-Key': apiKey
  }
});

export default nsApi;
