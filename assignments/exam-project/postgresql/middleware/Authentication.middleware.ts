import express from 'express';
const route = express();

route.use((req, res, next) => {
  const origin = req.headers['origin'];
  if (origin !== 'redis-server') return res.sendStatus(404);
  next();
});

export { route as AuthenticationMiddleware };
