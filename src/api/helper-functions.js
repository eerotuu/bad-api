const prettifyAvailabilityText = (text) => text
  .replace('INSTOCK', 'In Stock')
  .replace('OUTOFSTOCK', 'Out of Stock')
  .replace('LESSTHAN10', '< 10');

export const cleanAvailabilityData = (avail, regex) => avail
  .filter((a) => typeof (a) === 'object')
  .map((a) => {
    const availability = a;
    availability.id = a.id.toLowerCase();
    const { 1: match } = regex.exec(a.DATAPAYLOAD);
    availability.DATAPAYLOAD = prettifyAvailabilityText(match);
    return availability;
  });

export const combineObjectsReducer = (combined, current) => {
  const { id } = current;
  if (combined.has(id)) {
    combined.set(id, Object.assign(combined.get(id), current));
  } else {
    combined.set(id, current);
  }

  return combined;
};

export const combineListofObjectsReducer = (combined, currentList) => currentList
  .reduce(combineObjectsReducer, combined);

export const combineObjectArrays = (array1, array2) => [
  ...[array1, array2]
    .reduce(combineListofObjectsReducer, new Map()).values(),
];

export const categorize = (result, current) => {
  const categorized = result;
  categorized[current.type] = categorized[current.type] || [];
  categorized[current.type].push(current);
  return categorized;
};

export const validateArray = (data, errorMessage) => {
  if (Array.isArray(data) && data.length) {
    return data;
  }
  throw Error(errorMessage);
};
