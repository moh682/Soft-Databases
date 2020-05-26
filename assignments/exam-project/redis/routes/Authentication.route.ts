import express from 'express';
import { log } from '../utils';
const route = express();

route.post('/login', async (req, res, next) => {
  const { username, password } = req.body;
  log(req.method, req.body);
  try {
  } catch (ex) {
    return res.sendStatus(500);
  }
});

route.post('/register', async (req, res, next) => {
  const { username, password, secondPassword } = req.body;
  log(req.method, req.body);
  try {
  } catch (ex) {
    return res.sendStatus(500);
  }
});

export { route as AuthenticationRoute };
