import PG from 'pg';
import { inject } from 'pg-camelcase';
inject(PG);
export default class ConnectionPool {
  constructor(connectionString) {
    this.instance = new PG.Pool({ connectionString });
  }

  async Query(statement) {
    // console.log('statement', statement);
    try {
      const results = await this.instance.query(statement);
      return results.rows;
    } catch (error) {
      return {
        error: {
          code: parseInt(error.code, 10),
          detail: error.detail ? error.detail.replace(/[()]/g, '') : error.routine,
        },
      };
    }
  }

  getInstance() {
      return this;
  }
}