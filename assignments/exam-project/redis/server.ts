import express from 'express';
import { REDIS_PORT } from '../constants';
const server = express();

server.listen(REDIS_PORT, () => console.log(`Redis server is listening on port ${REDIS_PORT}`));
