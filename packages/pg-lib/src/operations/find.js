import List from './list';

export default async function item(table, conditions) {
  const values = await List(table, conditions);
  if (values.error) {
    return { error: values.error.routine };
  }

  return values[0] || {};
}
