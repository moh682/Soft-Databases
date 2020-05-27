import { Pool } from 'pg';
import colors from 'colors';
import { SQL_PASSWORD, SQL_USERNAME, SQL_DATABASE } from '../../constants';

let pool: Pool;
export default {
  getPool: function () {
    if (pool) return pool;
    pool = new Pool({
      user: SQL_USERNAME,
      password: SQL_PASSWORD,
      database: SQL_DATABASE,
    });
    pool.on('connect', () => {
      console.log(colors.green('PostgreSQL is connected'));
    });
    return pool;
  },
};
