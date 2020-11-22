import axios from 'axios';

const productRequest = axios.create({
  baseURL: 'https://bad-api-assignment.reaktor.com/products/',
  headers: { Accept: 'application/json'/* , 'x-force-error-mode': 'all' */ },
});

const availabilityRequest = axios.create({
  baseURL: 'https://bad-api-assignment.reaktor.com/availability/',
  headers: { Accept: 'application/json'/* , 'x-force-error-mode': 'all' */ },
});

const mergeLists = (mergedList, listToBeMerged) => {
  listToBeMerged.forEach((product) => {
    const object = product;
    const id = object.id.toLowerCase();

    if (mergedList.has(id)) {
      if (typeof object.type === 'undefined') {
        // clear tags, line breaks and whitespaces.
        const regex = /<[^>]*>|\\n| /g;
        object.DATAPAYLOAD = object.DATAPAYLOAD.replace(regex, '');
      }

      const targetObject = mergedList.get(id);
      mergedList.set(id, Object.assign(targetObject, object));
    } else {
      mergedList.set(id, object);
    }
  });

  return mergedList;
};

const categorize = (a, c) => {
  const temp = a;
  temp[c.type] = temp[c.type] || [];
  temp[c.type].push(c);
  return temp;
};

const getTypes = (types) => Promise.all(types.map((type) => productRequest.get(type)));

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
  .then(([products, results]) => [...[products, results].reduce(mergeLists, new Map()).values()])

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
