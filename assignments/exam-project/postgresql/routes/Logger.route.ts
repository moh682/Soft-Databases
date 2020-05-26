import express from 'express';
import { ILogger } from '../interfaces/ILogger';
const route = express();

route.post('/create', (req, res, next) => {
  const { body, method } = req.body as ILogger;
});
