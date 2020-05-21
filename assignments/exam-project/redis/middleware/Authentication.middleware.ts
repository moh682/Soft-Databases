import express from 'express';
import { TokenService } from '../services/TokenService';
const route = express();

const tokenService = new TokenService();
route.use((req, res, next) => {
  const token = req.headers['token'] as string;

  if (!token) return res.sendStatus(401);
  const isVerified = tokenService.verify(token);
  if (!isVerified) return res.sendStatus(406);

  next();
});

export { route as AuthenticationMiddleware };
