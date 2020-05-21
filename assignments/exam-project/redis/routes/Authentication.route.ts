import express from 'express';
const route = express();

route.post('/login', async (req, res, next) => {});
route.post('/register', async (req, res, next) => {});

export { route as AuthenticationRoute };
