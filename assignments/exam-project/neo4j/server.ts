import express from 'express';
import { NEO4J_PORT } from '../constants';
const server = express();

server.listen(NEO4J_PORT, () => console.log(`Neo4js server is listening on port ${NEO4J_PORT}`));
