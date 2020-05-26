import express from 'express';
import { SQL_API } from '../../constants';
import { log } from '../utils';
import { FetchService } from '../../services/FetchService';
const { get } = new FetchService();

const route = express();

route.get('/getAll', async (req, res, next) => {
  log(req.method, req.body);
  try {
    const logs = await get(`${SQL_API}/logs/getAll`).then(response => response.json());
    return res.json(logs);
  } catch (ex) {
    console.log(ex);
    return res.sendStatus(500);
  }
});

route.get('/getlast24h', async (req, res, next) => {
  log(req.method, req.body);
  try {
    const logs = await get(`${SQL_API}/logs/getlast24h`).then(response => response.json());
    return res.json(logs);
  } catch (ex) {
    return res.sendStatus(500);
  }
});

export { route as LoggerRoute };
