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
  let productData = [];
  results.forEach((response) => {
    productData = productData.concat(response.data);
  });

  const availabilityRequests = [];
  const manufacturers = [];
  productData.forEach((product) => {
    if (
      typeof product.manufacturer !== 'undefined'
      && !manufacturers.includes(product.manufacturer)
    ) {
      manufacturers.push(product.manufacturer);
      const request = availabilityRequest.get(product.manufacturer);
      availabilityRequests.push(request);
    }
  });

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

const createCategorizedResult = (mergedResult) => {
  const categorizedResult = {
    jackets: [],
    shirts: [],
    accessories: [],
  };
  mergedResult.forEach((product) => {
    categorizedResult[product.type].push(product);
  });

  return categorizedResult;
};

const fetchProducts = async (callback) => {
  // create product requests for each product category.
  const productTypes = ['jackets', 'shirts', 'accessories'];
  const productRequests = [];
  productTypes.forEach((type) => {
    productRequests.push(productRequest.get(type));
  });

  // wait for product request results and create availability requests for each manufacturer.
  const [productData, availabilityRequests] = await Promise.all(
    productRequests,
  ).then((results) => handleProductRequests(results));

  // wait for availability request results, then merge and categorize the results.
  const result = await Promise.all(availabilityRequests).then((results) => {
    let availabilityData = [];
    results.forEach((response) => {
      availabilityData = availabilityData.concat(response.data.response);
    });

    const mergedResult = [
      ...[productData, availabilityData]
        .reduce(mergeLists, new Map())
        .values(),
    ];

    return createCategorizedResult(mergedResult);
  });

  callback(result);
};

export default fetchProducts;
