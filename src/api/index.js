import axios from 'axios';

const productRequest = axios.create({
  baseURL: 'https://bad-api-assignment.reaktor.com/products/',
  headers: { Accept: 'application/json'/* , 'x-force-error-mode': 'all' */ },
});

const availabilityRequest = axios.create({
  baseURL: 'https://bad-api-assignment.reaktor.com/availability/',
  headers: { Accept: 'application/json'/* , 'x-force-error-mode': 'all' */ },
});

const getTypes = (types) => Promise.all(types.map((type) => productRequest.get(type)));

const cleanAvailabilityData = (avail, regex) => avail.map((a) => {
  const temp = a;
  temp.id = a.id.toLowerCase();
  temp.DATAPAYLOAD = a.DATAPAYLOAD.replace(regex, '');
  return temp;
});

const combineObjects = (combined, current) => {
  const { id } = current;
  if (combined.has(id)) {
    combined.set(id, Object.assign(combined.get(id), current));
  } else {
    combined.set(id, current);
  }

  return combined;
};

const combineObjLists = (combined, currentList) => currentList.reduce(combineObjects, combined);

const categorize = (a, c) => {
  const temp = a;
  temp[c.type] = temp[c.type] || [];
  temp[c.type].push(c);
  return temp;
};

const fetchProducts = async (types) => getTypes(types)
  .then((res) => res.map((r) => r.data).flat())

  // create availability requests for all manufacturers
  .then((products) => {
    const availReqs = products.reduce((a, c) => {
      if (!a.has(c.manufacturer)) {
        a.set(c.manufacturer, availabilityRequest.get(c.manufacturer));
      }
      return a;
    }, new Map()).values();
    return [products, availReqs];
  })

  // get availability results
  .then(([products, availReqs]) => Promise.all(availReqs)
    .then((res) => [products, res.map((r) => r.data.response).flat()]))

  // merge results
  .then(([products, results]) => {
    const cleanedAvailData = cleanAvailabilityData(results, /<[^>]*>|\\n| /g);
    return [...[products, cleanedAvailData].reduce(combineObjLists, new Map()).values()];
  })

  // filter availability data that is not needed
  .then((mergedResult) => mergedResult.filter((res) => typeof (res.type) !== 'undefined'))

  // categorize result into product types
  .then((filteredResult) => filteredResult.reduce(categorize, {}))

  // check that result is not empty
  .then((result) => {
    if (Object.entries(result) === 0) {
      throw new Error('empty result');
    }
    return result;
  });

export default fetchProducts;
