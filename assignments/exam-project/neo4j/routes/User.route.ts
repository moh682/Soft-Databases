import express from 'express';
import { UserMapper } from '../mappers/UserMapper';

const route = express();
const userMapper = new UserMapper();
route.post('/create', async (req, res, next) => {
  const { userName, userPassword } = req.body;

  try {
    await userMapper.create(userName, userPassword);
    res.json(`added ${req.body.userName}`);
  } catch (error) {
    return res.sendStatus(500);
  }
});

route.post('/follow', async (req, res, next) => {
  const { userName, usertoFollow } = req.body;
  try {
    await userMapper.create(userName, usertoFollow);
    return res.json(`${req.body.userName} follows ${req.body.userToFollow}`);
  } catch (error) {
    return res.sendStatus(500);
  }
});

export { route };
