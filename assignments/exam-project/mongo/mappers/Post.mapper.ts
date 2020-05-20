import { IPostModel, Post } from '../models/Post.model';
import { IPost } from '../interfaces/IPost';
import { Mapper } from './Mapper';

export class PostMapper extends Mapper<IPost, IPostModel> {
  constructor() {
    super(Post);
  }
}
