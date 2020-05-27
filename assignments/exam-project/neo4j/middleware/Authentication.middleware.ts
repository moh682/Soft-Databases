import express from 'express';
const route = express();
import { UNIQUE_SERVER_NAME } from '../../constants';

route.use((req, res, next) => {
  const origin = req.headers['origin'] as string;
  if (origin !== UNIQUE_SERVER_NAME) return res.sendStatus(404);
  next();
});

export { route as AuthenticationMiddleware };
