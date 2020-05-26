import express from 'express';
import fetch from 'node-fetch';
import { MONGO_API } from '../../constants';
import { log } from '../utils';
const route = express();

route.get('/find/id/:id', async (req, res, next) => {
  const { id } = req.params;
  log(req.method, req.body);
  try {
    const postId = await fetch(`${MONGO_API}/post/find/id/${id}`, { headers: { Origin: 'redis-server' } });
    return res.json(postId);
  } catch (error) {
    return res.send('Error occured');
  }
});

route.get('/find/all', async (req, res, next) => {
  log(req.method, req.body);
  try {
    const posts = await fetch(`${MONGO_API}/post/find/all`, { headers: { Origin: 'redis-server' } });
    return res.json(posts);
  } catch (error) {
    return res.send('Error occured');
  }
});

route.get('/find/all/id/:id', async (req, res, next) => {
  log(req.method, req.body);
  const { id } = req.params;
  try {
    const postId = await fetch(`${MONGO_API}/post/find/all/id/${id}`, { headers: { Origin: 'redis-server' } });
    return res.json(postId);
  } catch (error) {
    return res.send('Error occured');
  }
});

route.post('/create', async (req, res, next) => {
  log(req.method, req.body);
  console.log('isCreating');
  try {
    const postId = await fetch(`${MONGO_API}/post/create`, {
      method: 'POST',
      body: JSON.stringify(req.body),
      headers: {
        'Content-Type': 'Application/json',
        Origin: 'redis-server',
      },
    }).then(response => {
      return response;
    });
    return res.json({ id: postId });
  } catch (error) {
    return res.send('Error occured');
  }
});

route.delete('/delete', async (req, res, next) => {
  log(req.method, req.body);
  const { content, owner } = req.body;
  try {
    const postId = await fetch(`${MONGO_API}/post/delete`, {
      method: 'delete',
      body: JSON.stringify(req.body),
      headers: {
        'Content-Type': 'Application/json',
        Origin: 'redis-server',
      },
    });
    return res.json({ id: postId });
  } catch (error) {
    return res.send('Error occured');
  }
});

export { route as PostRoute };
