import { Pool, Client } from 'pg';
import colors from 'colors';
import { SQL_DATABASE, SQL_PASSWORD, SQL_USERNAME } from '../../constants';

let pool: Pool;
let client: Client;
export default {
  getPool: function () {
    if (pool) return pool;
    pool = new Pool({
      database: SQL_DATABASE,
      user: SQL_USERNAME,
      password: SQL_PASSWORD,
    });
    pool.on('connect', () => {
      console.log(colors.green('PostgreSQL is connected'));
    });
    return pool;
  },
  getClient: function () {
    if (client) return client;
    client = new Client({
      database: SQL_DATABASE,
      user: SQL_USERNAME,
      password: SQL_PASSWORD,
    });
    return client;
  },
};
