import express from 'express';
import { UserMapper } from '../mappers/UserMapper';

const route = express();
const userMapper = new UserMapper();
route.post('/create', async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const s = await userMapper.create(username, password);
    return res.json(s);
  } catch (error) {
    return res.sendStatus(500);
  }
});

route.get('/find/username/:username', async (req, res, next) => {
  const { username } = req.params;
  try {
    const user = await userMapper.find(username);
    return res.json(user || {});
  } catch (error) {
    return res.sendStatus(500);
  }
});

route.get('/find/all', async (req, res, next) => {
  try {
    const user = await userMapper.findAll();
    return res.json(user);
  } catch (error) {
    return res.sendStatus(500);
  }
});

route.get('/mostImportant', async (req, res, next) => {
  try {
    const result: any = await userMapper.getMostImportant();
    if (result.length === 0) return res.sendStatus(400);
    return res.json(result);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

route.get('/mostFollowed', async (req, res, next) => {
  try {
    const result: any = await userMapper.getMostFollowed();
    if (result.length === 0) return res.sendStatus(400);
    return res.json(result);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

route.post('/follow', async (req, res, next) => {
  const { username, following } = req.body;
  try {
    const response: any = await userMapper.follow(username, following);
    if (response.length === 0) return res.sendStatus(400);
    return res.sendStatus(200);
  } catch (error) {
    return res.sendStatus(500);
  }
});

export { route };
