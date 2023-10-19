import { keyInStringArray } from './utils';

export const camelToSnakeCase = (str) => str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);

const Conditions = (obj) => {
  const pairs = keyInStringArray(obj);
  return pairs.join(' AND ');
};

const Values = (obj) => {
  const pairs = Object.keys(obj).map((key) => `${camelToSnakeCase(key)}='${obj[key]}'`);
  return pairs.join(',');
};

const SeparatedKeysAndValues = (values) => Object.keys(values)
  .reduce((acc, cur) => {
    const key = camelToSnakeCase(cur);
    acc.keys.push(key);
    const value = ['number', 'boolean'].includes(typeof values[cur]) ? values[cur] : `'${values[cur]}'`;
    acc.values.push(value);
    return acc;
  }, { keys: [], values: [] });

const Insert = ({ table, values }) => {
  const res = SeparatedKeysAndValues(values);
  const cols = res.keys.join(',');
  const vals = res.values.join(',');

  const statement = `
    INSERT INTO ${table}
    (${cols})
    VALUES
    (${vals})
    RETURNING *
    ;
  `;
  return statement;
};

const Select = ({ condition, table, values }) => {
  const selectValues = values ? `(${values.join(',')})` : '*';

  const parts = [
    `SELECT ${selectValues}`,
    `FROM ${table}`,
  ];

  if (condition) {
    const conditions = Conditions(condition);
    parts.push(`WHERE ${conditions}`);
  }

  return parts.join(' ');
};

const Delete = ({ condition, table }) => `DELETE FROM ${table} WHERE ${Conditions(condition)} RETURNING *`;

const Update = ({ condition, table, values }) => `UPDATE ${table} SET ${Values(values)} WHERE ${Conditions(condition)} RETURNING *`;

export default {
  Insert,
  Delete,
  Select,
  Update,
};
