import { Pool } from 'pg';
import colors from 'colors';
import { SQL_DATABASE, SQL_PASSWORD, SQL_USERNAME } from '../../constants';

const client = new Pool({
  database: SQL_DATABASE,
  user: SQL_USERNAME,
  password: SQL_PASSWORD,
});

client.once('connect', () => {
  console.log(colors.green('PostgreSQL'));
});

let pool: Pool;
export default {
  getPool: function () {
    if (pool) return pool;
    pool = new Pool({
      database: SQL_DATABASE,
      user: SQL_USERNAME,
      password: SQL_PASSWORD,
    });
    return pool;
  },
};
