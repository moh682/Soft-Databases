import express from 'express';
import { TokenService } from '../services/TokenService';
import { SessionMapper } from '../mappers/SessionMapper';
import { IUser } from '../../neo4j/interfaces/IUser';
const route = express();

const sessionMapper = new SessionMapper();
const tokenService = new TokenService();
route.use(async (req, res, next) => {
  const token = req.headers['token'] as string;

  if (!token) return res.sendStatus(401);
  const isVerified = tokenService.verify(token) as IUser;
  if (!isVerified) return res.sendStatus(406);

  const token_in_redis = await sessionMapper.get(`name:${isVerified.username}`);
  if (token_in_redis !== token) res.sendStatus(407);
  next();
});

export { route as AuthenticationMiddleware };
