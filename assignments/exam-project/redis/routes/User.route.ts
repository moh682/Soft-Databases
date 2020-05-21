import express from 'express';
import fetch from 'node-fetch';
import { NEO4J_API } from '../../constants';
const route = express();

route.post('/create', async (req, res, next) => {
  try {
    await fetch(`${NEO4J_API}/user/create`, {
      method: 'post',
      body: JSON.stringify(req.body),
      headers: {
        'Content-Type': 'Application/json',
      },
    });
    res.json(`added ${req.body.userName}`);
  } catch (error) {
    return res.sendStatus(500);
  }
});

route.get('/find/username/:username', async (req, res, next) => {
  const { username } = req.params;
  try {
    const user = await fetch(`${NEO4J_API}/user/username/${username}`);
    return res.json(user);
  } catch (error) {
    return res.sendStatus(500);
  }
});

route.post('/follow', async (req, res, next) => {
  try {
    await await fetch(`${NEO4J_API}/user/follow`, {
      method: 'post',
      body: JSON.stringify(req.body),
      headers: {
        'Content-Type': 'Application/json',
      },
    });
    return res.json(`${req.body.userName} follows ${req.body.userToFollow}`);
  } catch (error) {
    return res.sendStatus(500);
  }
});

export { route as UserRoute };
