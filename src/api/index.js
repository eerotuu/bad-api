import axios from 'axios';

const productRequest = axios.create({
  baseURL: 'https://bad-api-assignment.reaktor.com/products/',
  headers: { Accept: 'application/json' },
});

const availabilityRequest = axios.create({
  baseURL: 'https://bad-api-assignment.reaktor.com/availability/',
  headers: { Accept: 'application/json' },
});

const handleProductRequests = (results) => {
  const productData = results.map((res) => res.data).flat();

  const availabilityRequests = productData.reduce((a, c) => {
    if (!a.has(c.manufacturer)) {
      a.set(c.manufacturer, availabilityRequest.get(c.manufacturer));
    }

    return a;
  }, new Map()).values();

  return [productData, availabilityRequests];
};

// merge product and availability data. when using reduce, give products array as first value.
const mergeLists = (mergedList, listToBeMerged) => {
  listToBeMerged.forEach((product) => {
    const object = product;
    if (typeof object.id !== 'undefined') {
      const id = object.id.toLowerCase();

      if (mergedList.has(id)) {
        if (typeof object.DATAPAYLOAD !== 'undefined') {
          // clear tags, line breaks and whitespaces.
          const regex = /<[^>]*>|\\n| /g;
          object.DATAPAYLOAD = object.DATAPAYLOAD.replace(regex, '');
        }

        const targetObject = mergedList.get(id);
        mergedList.set(id, Object.assign(targetObject, object));
      } else if (typeof object.type !== 'undefined') {
        object.DATAPAYLOAD = 'UNKNOWN';
        mergedList.set(id, object);
      }
    }
  });

  return mergedList;
};

const handleAvailabilityRequest = (results, productData) => {
  const availabilityData = results.map((res) => res.data.response).flat();
  const mergedResult = [
    ...[productData, availabilityData]
      .reduce(mergeLists, new Map())
      .values(),
  ];

  const categorizedResult = mergedResult.reduce((a, c) => {
    const temp = a;
    temp[c.type] = temp[c.type] || [];
    a[c.type].push(c);
    return a;
  }, {});

  return categorizedResult;
};

const fetchProducts = async (callback) => {
  // create product requests for each product category.
  const productTypes = ['jackets', 'shirts', 'accessories'];
  const productRequests = productTypes.map((type) => productRequest.get(type));

  // wait for product request results and create availability requests for each manufacturer.
  const [productData, availabilityRequests] = await Promise.all(
    productRequests,
  ).then((results) => handleProductRequests(results));

  // wait for availability request results, then merge and categorize the results.
  const result = await Promise.all(
    availabilityRequests,
  ).then((results) => handleAvailabilityRequest(results, productData));

  callback(result);
};

export default fetchProducts;
