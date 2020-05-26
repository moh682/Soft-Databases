import express from 'express';
import bodyParser from 'body-parser';
import { AuthenticationMiddleware } from './middleware/Authentication.middleware';
import { LoggerRoute } from './routes/Logger.route';
import connector from './services/DBConnector';
import { SQL_PORT } from '../constants';

connector.getPool().connect();

const server = express();

server.use(bodyParser.json());
server.use('/logs', AuthenticationMiddleware, LoggerRoute);

server.listen(SQL_PORT, () => console.log(`PostgreSQL server is listening on port ${SQL_PORT}`));
