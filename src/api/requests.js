import axios from 'axios';

export const productRequest = axios.create({
  baseURL: 'https://bad-api-assignment.reaktor.com/products/',
  headers: { Accept: 'application/json'/* , 'x-force-error-mode': 'all' */ },
});

export const availabilityRequest = axios.create({
  baseURL: 'https://bad-api-assignment.reaktor.com/availability/',
  headers: { Accept: 'application/json'/* , 'x-force-error-mode': 'all' */ },
});
