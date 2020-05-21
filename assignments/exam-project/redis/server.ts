import express from 'express';
import { REDIS_PORT } from '../constants';
import { client } from './services/DBConnector';
import { AuthenticationRoute } from './routes/Authentication.route';
client.PING;

const server = express();

server.use('auth', AuthenticationRoute);

server.listen(REDIS_PORT, () => console.log(`Redis server is listening on port ${REDIS_PORT}`));
