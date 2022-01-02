export function removeWhiteSpaces(object) {
  const data = {};
  Object.keys(object).forEach((key) => {
    if (typeof object[key] !== 'string') {
      data[key] = object[key];
    } else {
      data[key] = object[key].trim();
    }
  });
  return data;
}
