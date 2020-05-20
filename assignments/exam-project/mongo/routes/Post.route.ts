import express from 'express';
import { PostMapper } from '../mappers/Post.Mapper';
import { IPost } from '../interfaces/IPost';
const route = express();

const postMapper = new PostMapper();

route.get('/find/id/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const postId = await postMapper.getOneByCustom({ _id: id } as any);
    return res.json(postId);
  } catch (error) {
    return res.send('Error occured');
  }
});

route.get('/find/all', async (req, res, next) => {
  try {
    const posts = await postMapper.getManyByCustom({});
    return res.json(posts);
  } catch (error) {
    return res.send('Error occured');
  }
});

route.get('/find/all/id/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const postId = await postMapper.getManyByCustom({ owner: id });
    return res.json(postId);
  } catch (error) {
    return res.send('Error occured');
  }
});

route.post('/create', async (req, res, next) => {
  const { content, owner } = req.body as IPost;
  try {
    const postId = await postMapper.insert({ content, owner });
    return res.json({ id: postId });
  } catch (error) {
    return res.send('Error occured');
  }
});

route.delete('/delete', async (req, res, next) => {
  const { content, owner } = req.body as IPost;
  try {
    const postId = await postMapper.insert({ content, owner });
    return res.json({ id: postId });
  } catch (error) {
    return res.send('Error occured');
  }
});

export { route };
