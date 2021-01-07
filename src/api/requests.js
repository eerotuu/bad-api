import axios from 'axios';

const baseURL = 'https://bad-api-assignment.reaktor.com/';

export const productRequest = axios.create({
  baseURL: baseURL.concat('v2/').concat('products/'),
  headers: {
    Accept: 'application/json',
    // 'x-force-error-mode': 'all',
  },
  timeout: 100000,
});

export const availabilityRequest = axios.create({
  baseURL: baseURL.concat('v2/').concat('availability/'),
  headers: {
    Accept: 'application/json',
    // 'x-force-error-mode': 'all',
  },
  timeout: 100000,
});
