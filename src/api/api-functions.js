export const cleanAvailabilityData = (avail, regex) => avail.map((a) => {
  const availability = a;
  availability.id = a.id.toLowerCase();
  availability.DATAPAYLOAD = a.DATAPAYLOAD.replace(regex, '');
  return availability;
});

export const combineObjects = (combined, current) => {
  const { id } = current;
  if (combined.has(id)) {
    combined.set(id, Object.assign(combined.get(id), current));
  } else {
    combined.set(id, current);
  }

  return combined;
};

export const combineObjLists = (combined, currentList) => currentList
  .reduce(combineObjects, combined);

export const categorize = (result, current) => {
  const categorized = result;
  categorized[current.type] = categorized[current.type] || [];
  categorized[current.type].push(current);
  return categorized;
};
