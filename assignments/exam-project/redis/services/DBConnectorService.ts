import redis from 'redis';
import { REDIS_HOST, REDIS_PASSWORD, REDIS_DB_PORT } from '../../constants';
import colors from 'colors';

const client = redis.createClient({
  host: REDIS_HOST,
  password: REDIS_PASSWORD,
  port: REDIS_DB_PORT,
});

client.ping((error, string) => {
  if (error) return console.log(colors.red('Redis is not cononected '));
  console.log(colors.green('Redis is connected'));
});

export { client };
