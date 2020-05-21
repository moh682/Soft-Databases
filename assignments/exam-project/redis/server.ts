import express from 'express';
import { REDIS_PORT } from '../constants';
import { client } from './services/DBConnectorService';
import { AuthenticationRoute } from './routes/Authentication.route';
import { AuthenticationMiddleware } from './middleware/Authentication.middleware';
import { PostRoute } from './routes/Post.route';
import { UserRoute } from './routes/User.route';
client.PING;

const server = express();

server.use('/auth', AuthenticationRoute);
server.use('/post', AuthenticationMiddleware, PostRoute);
server.use('/user', AuthenticationMiddleware, UserRoute);

server.listen(REDIS_PORT, () => console.log(`Redis server is listening on port ${REDIS_PORT}`));
