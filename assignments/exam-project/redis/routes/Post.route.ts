import express from 'express';
import { cyan } from 'colors';
import { MONGO_API } from '../../constants';
import { FetchService } from '../../services/FetchService';
const { get, post, delete: deleteFetch } = new FetchService();
import { log } from '../utils';
const route = express();

route.get('/find/id/:id', async (req, res, next) => {
  const { id } = req.params;
  log(req.method, req.body);
  try {
    const postId = await get(`${MONGO_API}/post/find/id/${id}`).then(response => response.json());
    return res.json(postId);
  } catch (error) {
    return res.send('Error occured');
  }
});

route.get('/find/all', async (req, res, next) => {
  log(req.method, req.body);
  try {
    const posts = await get(`${MONGO_API}/post/find/all`).then(response => {
      return response.json();
    });
    console.log(cyan(posts));
    return res.json(posts);
  } catch (error) {
    console.log(error);
    return res.send('Error occured');
  }
});

route.get('/find/all/id/:id', async (req, res, next) => {
  log(req.method, req.body);
  const { id } = req.params;
  try {
    const postId = await get(`${MONGO_API}/post/find/all/id/${id}`).then(response => response.json());
    return res.json(postId);
  } catch (error) {
    return res.send('Error occured');
  }
});

route.post('/create', async (req, res, next) => {
  log(req.method, req.body);
  try {
    const postId = await post(`${MONGO_API}/post/create`, req.body).then(response => {
      return response;
    });
    return res.json({ id: postId });
  } catch (error) {
    return res.send('Error occured');
  }
});

route.delete('/delete', async (req, res, next) => {
  log(req.method, req.body);
  try {
    const postId = await deleteFetch(`${MONGO_API}/post/delete`, req.body).then(response => response.json());
    return res.json({ id: postId });
  } catch (error) {
    return res.send('Error occured');
  }
});

export { route as PostRoute };
