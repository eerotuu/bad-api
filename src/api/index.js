import { productRequest, availabilityRequest } from './requests';
import { cleanAvailabilityData, combineObjLists, categorize } from './api-functions';

const getTypes = (types) => Promise.all(types.map((type) => productRequest.get(type)));

const getProductData = (results) => results.map((r) => r.data).flat();

const createAvailabilityRequests = (products) => {
  const availReqs = products.reduce((requests, current) => {
    if (!requests.has(current.manufacturer)) {
      requests.set(current.manufacturer, availabilityRequest.get(current.manufacturer));
    }
    return requests;
  }, new Map()).values();
  return { products, availReqs };
};

const getAvailabilityData = ({ products, availReqs }) => Promise.all(availReqs)
  .then((res) => [products, res.map((r) => r.data.response).flat()]);

const transformResults = ([products, availability]) => {
  const cleanedAvailData = cleanAvailabilityData(availability, /<[^>]*>|\\n| /g);
  return [...[products, cleanedAvailData]
    .reduce(combineObjLists, new Map()).values()]
    .filter((res) => typeof (res.type) !== 'undefined')
    .reduce(categorize, {});
};

const validateResult = (result) => {
  if (Object.entries(result) === 0) {
    throw new Error('empty result');
  }
  return result;
};

const fetchProducts = async (types) => getTypes(types)
  .then(getProductData)
  .then(createAvailabilityRequests)
  .then(getAvailabilityData)
  .then(transformResults)
  .then(validateResult);

export default fetchProducts;
