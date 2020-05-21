import redis from 'redis';
import colors from 'colors';

const client = redis.createClient();

client.ping((error, string) => {
  if (error) return console.log(colors.red('Redis is not cononected '));
  console.log(colors.green('Redis is connected'));
});

export { client };
