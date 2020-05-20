import { Schema, Types, model, Document } from 'mongoose';
import { ObjectId, ObjectID } from 'mongodb';
import { IPost } from '../interfaces/IPost';

// tslint:disable-next-line: no-empty-interface
export interface IPostModel extends IPost, Document {}

// tslint:disable-next-line: variable-name
const PostSchema = new Schema<IPostModel>({
  owner: { type: String, required: true },
  content: { type: String },
  created: { type: Date, default: Date.now },
});

const postSchema = model<IPostModel>('posts', PostSchema);
export { postSchema as Post };
