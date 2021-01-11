import axios from 'axios';

const baseURL = 'https://bad-api-assignment.reaktor.com/';
const proxy = 'https://glacial-hamlet-11938.herokuapp.com/'; // not sure if proxying was intended in this task.

export const productRequest = axios.create({
  baseURL: proxy.concat(baseURL).concat('v2/').concat('products/'),
  headers: {
    Accept: 'application/json',
    // 'x-force-error-mode': 'all',
  },
  timeout: 100000,
});

export const availabilityRequest = axios.create({
  baseURL: proxy.concat(baseURL).concat('v2/').concat('availability/'),
  headers: {
    Accept: 'application/json',
    // 'x-force-error-mode': 'all',
  },
  timeout: 100000,
});
