import express from 'express';
import { SQL_API } from '../../constants';
import { log } from '../utils';
import fetch from 'node-fetch';

const route = express();

route.get('/getAll', async (req, res, next) => {
  log(req.method, req.body);
  try {
    const logs = await fetch(`${SQL_API}/logs/getAll`, { headers: { origin: 'redis-server' } }).then(response =>
      response.json(),
    );
    console.log(logs);
    return res.json(logs);
  } catch (ex) {
    console.log(ex);
    return res.sendStatus(500);
  }
});

route.get('/getlast24h', async (req, res, next) => {
  log(req.method, req.body);
  try {
    const logs = await fetch(`${SQL_API}/logs/getlast24h`, { headers: { origin: 'redis-server' } }).then(response =>
      response.json(),
    );
    return res.json(logs);
  } catch (ex) {
    return res.sendStatus(500);
  }
});

export { route as LoggerRoute };
