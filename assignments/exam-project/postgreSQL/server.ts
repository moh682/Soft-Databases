import express from 'express';
import { SQL_PORT } from '../constants';

const server = express();

server.listen(SQL_PORT, () => console.log(`Redis server is listening on port ${SQL_PORT}`));
