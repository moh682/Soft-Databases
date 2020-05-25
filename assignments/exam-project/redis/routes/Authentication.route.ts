import express from 'express';
const route = express();

route.post('/login', async (req, res, next) => {
  const { username, password } = req.body;

  try {
  } catch (ex) {
    return res.sendStatus(500);
  }
});

route.post('/register', async (req, res, next) => {
  const { username, password, secondPassword } = req.body;

  try {
  } catch (ex) {
    return res.sendStatus(500);
  }
});

export { route as AuthenticationRoute };
