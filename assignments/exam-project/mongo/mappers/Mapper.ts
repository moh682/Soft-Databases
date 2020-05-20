import { Model, Document, Types } from 'mongoose';
import { ObjectId } from 'mongodb';

export class Mapper<T, U extends Document> {
  private model: Model<U, {}>;
  constructor(model: Model<U, {}>) {
    this.model = model;
  }
  public async insert(value: T): Promise<Types.ObjectId> {
    return new Promise((resolve, reject) => {
      const object = new this.model(value);
      object.save((error, document) => {
        if (error) throw new Error('Error inserting');
        resolve(document._id as ObjectId);
      });
    });
  }
  public async getById(id: Types.ObjectId): Promise<T> {
    return (await this.model.findById(id)) as any;
  }
  public async deleteAll(): Promise<void> {
    await this.model.deleteMany({});
  }
  public async getOneByCustom(object: T): Promise<T> {
    return (await this.model.findOne(object)) as any;
  }
  public async getManyByCustom(object: T, conditional?: any): Promise<T[]> {
    return (await this.model.find(object)) as any;
  }
}
