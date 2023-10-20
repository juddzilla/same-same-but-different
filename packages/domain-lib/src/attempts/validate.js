const allSame = arr => arr.every(v => v === arr[0]);
const allUnique = arr => arr.length === new Set(arr).size;

export default (values) => {
  const splits = values.reduce((acc, current) => {
    const parts = current.split("");
    for (let j = 0; j < parts.length; j++) {
      if (!Object.hasOwn(acc, j)) {
        acc[j] = [];
      }
      acc[j].push(parts[j]);
    }
    return acc;
  }, {});

  return Object.values(splits).every(split => {
    return allSame(split) || allUnique(split);
  });
}