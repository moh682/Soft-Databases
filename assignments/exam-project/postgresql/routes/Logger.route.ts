import express from 'express';
import { ILogger } from '../interfaces/ILogger';

import { LoggingMapper } from '../mappers/Logger.mapper';

const route = express();

const logginMapper = new LoggingMapper();
route.post('/create', async (req, res, next) => {
  let { body, method } = req.body as ILogger;
  body = Object.keys(body).length > 0 ? body : null;
  try {
    const isCreated = await logginMapper.createLog(method, JSON.stringify(body));
    if (!isCreated) return res.sendStatus(400);
    return res.sendStatus(201);
  } catch (ex) {
    return res.sendStatus(500);
  }
});

route.get('/getAll', async (req, res, next) => {
  try {
    const logs = await logginMapper.getAllLogs();
    return res.json(logs);
  } catch (ex) {
    console.log(ex);
    return res.sendStatus(500);
  }
});
route.get('/getlast24h', async (req, res, next) => {
  try {
    const logs = await logginMapper.getLast24Hours();
    return res.json(logs);
  } catch (ex) {
    return res.sendStatus(500);
  }
});

export { route as LoggerRoute };
