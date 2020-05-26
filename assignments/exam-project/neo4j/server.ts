import express from 'express';
import { NEO4J_PORT } from '../constants';
const server = express();
import { route as userRoute } from './routes/User.route';
import bodyParser from 'body-parser';
import { AuthenticationMiddleware } from './middleware/Authentication.middleware';

server.use(bodyParser.json());
server.use('/user', AuthenticationMiddleware, userRoute);
server.listen(NEO4J_PORT, () => console.log(`Neo4js server is listening on port ${NEO4J_PORT}`));
