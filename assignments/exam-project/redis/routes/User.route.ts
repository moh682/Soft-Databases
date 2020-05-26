import express from 'express';
import { NEO4J_API } from '../../constants';
import { FetchService } from '../../services/FetchService';
import { log } from '../utils';
const { get, post } = new FetchService();
const route = express();

route.post('/create', async (req, res, next) => {
  log(req.method, req.body);
  try {
    await post(`${NEO4J_API}/user/create`, req.body);
    return res.json(`added ${req.body.userName}`);
  } catch (error) {
    return res.sendStatus(500);
  }
});

route.get('/find/username/:username', async (req, res, next) => {
  log(req.method, req.body);
  const { username } = req.params;
  try {
    const user = await get(`${NEO4J_API}/user/find/username/${username}`).then(response => response.json());
    return res.json(user);
  } catch (error) {
    return res.sendStatus(500);
  }
});

route.post('/follow', async (req, res, next) => {
  log(req.method, req.body);
  try {
    const hasCreated = await post(`${NEO4J_API}/user/follow`, req.body).then(response => response.status === 200);
    if (hasCreated) return res.sendStatus(200);
    return res.sendStatus(400);
  } catch (error) {
    return res.sendStatus(500);
  }
});

route.get('/find/all', async (req, res, next) => {
  try {
    const user = await get(`${NEO4J_API}/user/find/all`).then(response => response.json());
    return res.json(user);
  } catch (error) {
    return res.sendStatus(500);
  }
});

export { route as UserRoute };
