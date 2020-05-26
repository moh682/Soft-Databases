import express from 'express';
import bodyParser from 'body-parser';
import { MONGO_PORT } from '../constants';
import { DBConnector } from './services/DBConnector';
import { route as PostRoute } from './routes/Post.route';
import { AuthenticationMiddleware } from './middleware/Authentication.middleware';

const dbconnector = new DBConnector();
dbconnector.connect();

const server = express();
server.use(bodyParser.json());

server.use('/post', AuthenticationMiddleware, PostRoute);

server.listen(MONGO_PORT, () => console.log(`Mongo server is listening on port ${MONGO_PORT}`));
