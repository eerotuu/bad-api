import { productRequest, availabilityRequest } from './requests';
import { cleanAvailabilityData, combineObjLists, categorize } from './api-functions';

const getProducts = async (categories) => {
  const response = await Promise.all(categories.map((type) => productRequest.get(type)));
  return response.map((r) => r.data).flat();
};

const getAvailability = async (products) => {
  const availReqs = products.reduce((requests, current) => {
    if (!requests.has(current.manufacturer)) {
      requests.set(current.manufacturer, availabilityRequest.get(current.manufacturer));
    }
    return requests;
  }, new Map()).values();

  const response = await Promise.all(availReqs);
  const availability = response.map((r) => r.data.response).flat();
  return { products, availability };
};

const transformResults = ({ products, availability }) => {
  const cleanedAvailData = cleanAvailabilityData(availability, /<[^>]*>|\\n| /g);
  return [...[products, cleanedAvailData]
    .reduce(combineObjLists, new Map()).values()]
    .filter((product) => typeof (product.type) !== 'undefined')
    .reduce(categorize, {});
};

const validateResult = (result) => {
  if (Object.entries(result) === 0) {
    throw new Error('empty result');
  }
  return result;
};

const fetchProducts = async (categories) => getProducts(categories)
  .then(getAvailability)
  .then(
    transformResults,
    validateResult,
  );

export default fetchProducts;
