export const sanitizeObj = (obj: Object) => {
  const filteredObj: Object = {};

  const keys: string[] = Object.keys(obj);

  keys.forEach((key) => {
    if (obj[key] !== undefined && obj[key] !== null) {
      filteredObj[key] = obj[key];
    }
  });

  return filteredObj;
};
