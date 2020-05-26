import express from 'express';
import colors from 'colors';
import { UNIQUE_SERVER_NAME } from '../../constants';
const route = express();

route.use((req, res, next) => {
  const origin = req.headers['origin'];
  if (origin !== UNIQUE_SERVER_NAME) return res.sendStatus(404);
  next();
});

export { route as AuthenticationMiddleware };
