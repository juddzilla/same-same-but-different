const emptyValues = [null, undefined];

const camelToSnakeCase = (str) => str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);

export const truthyValue = (value) => !!((Array.isArray(value) && value.length)
  || (!emptyValues.includes(value)));


export const keyInStringArray = (data) => Object.keys(data)
  .map((key) => {
    const values = Array.isArray(data[key]) ? data[key].map((value) => {
      if (truthyValue(value)) {
        return `'${value}'`;
      }
    }).join(',') : `'${data[key]}'`;
    return `${camelToSnakeCase(key)} IN (${values})`;
  });

export const randomFromArray = (items) => items[Math.floor(Math.random()*items.length)];