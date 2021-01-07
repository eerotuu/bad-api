import { productRequest, availabilityRequest } from './requests';
import {
  cleanAvailabilityData,
  categorize,
  validateArray,
  combineObjectArrays,
} from './helper-functions';

const getProducts = async (categories) => {
  const response = await Promise.all(categories.map((type) => productRequest.get(type)));
  return response.map((r) => validateArray(
    r.data,
    'The server returned an empty product data.',
  )).flat();
};

const getAvailability = async (products) => {
  const availReqs = products.reduce((requests, current) => {
    if (!requests.has(current.manufacturer)) {
      requests.set(current.manufacturer, availabilityRequest.get(current.manufacturer));
    }
    return requests;
  }, new Map()).values();

  const response = await Promise.all(availReqs);
  const availability = response.map((r) => validateArray(
    r.data.response,
    'The server returned an empty availability data.',
  )).flat();
  return { products, availability };
};

const transformResults = ({ products, availability }) => {
  const cleanedAvailData = cleanAvailabilityData(
    availability,
    /<INSTOCKVALUE>(.*?)<\/INSTOCKVALUE>/,
  );

  return combineObjectArrays(products, cleanedAvailData)
    .filter((product) => typeof (product.type) !== 'undefined') // remove unused availability data.
    .reduce(categorize, {});
};

const fetchProductData = async (categories) => getProducts(categories)
  .then(getAvailability)
  .then(transformResults);

export default fetchProductData;
