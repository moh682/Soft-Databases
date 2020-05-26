import express from 'express';
import colors from 'colors';
import bodyParser from 'body-parser';
import { AuthenticationMiddleware } from './middleware/Authentication.middleware';
import connector from './services/DBConnector';
import { SQL_PORT } from '../constants';

connector.getPool().connect();

const server = express();

server.use(bodyParser.json());
server.use(AuthenticationMiddleware);

server.listen(SQL_PORT, () => console.log(`PostgreSQL server is listening on port ${SQL_PORT}`));
