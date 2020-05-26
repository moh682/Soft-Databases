import express from 'express';
import bodyParser from 'body-parser';
import { AuthenticationMiddleware } from './middleware/Authentication.middleware';
import { LoggerRoute } from './routes/Logger.route';
import { LoggingMapper } from './mappers/Logger.mapper';
import { SQL_PORT } from '../constants';

const loggerMapper = new LoggingMapper();
try {
  loggerMapper.injectFile();
} catch (ex) {
  console.log(ex);
}

const server = express();

server.use(bodyParser.json());
server.use('/logs', AuthenticationMiddleware, LoggerRoute);

server.listen(SQL_PORT, () => console.log(`PostgreSQL server is listening on port ${SQL_PORT}`));
