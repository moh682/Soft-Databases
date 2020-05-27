import express from 'express';
import { AuthenticationLogic } from '../logic/Authentication.logic';
import { log } from '../utils';
const route = express();

const authenticationLogic = new AuthenticationLogic();
route.post('/login', async (req, res, next) => {
  const { username, password } = req.body;
  log(req.method, req.body);
  try {
    const token = await authenticationLogic.login(username, password);
    if (!token) return res.sendStatus(400);
    return res.json(token);
  } catch (ex) {
    console.log(ex);
    return res.sendStatus(500);
  }
});

route.post('/register', async (req, res, next) => {
  const { username, password } = req.body;
  log(req.method, req.body);
  try {
    const token = await authenticationLogic.register(username, password);
    if (!token) return res.sendStatus(400);
    return res.json(token);
  } catch (ex) {
    console.log(ex);
    return res.sendStatus(500);
  }
});

export { route as AuthenticationRoute };
