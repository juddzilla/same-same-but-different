import StatementBuilder from './statement_builder';
import Database from '../connection/instance';

const update = async (table, data) => {
  const { condition, values } = data;

  const statement = StatementBuilder.Update({ table, condition, values });
  const results = await Database.getInstance().Query(statement);

  return results[0] || {};
};

export default update;
