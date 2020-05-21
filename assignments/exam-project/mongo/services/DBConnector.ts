import mongoose, { Mongoose, STATES, ConnectionStates, ConnectionBase } from 'mongoose';
import colors from 'colors';
import { MONGO_DATABASE } from '../../constants';

export class DBConnector {
  private connection: Mongoose;

  public getConnection(): Promise<Mongoose> {
    return new Promise(async (resolve, reject) => {
      if (this.connection !== undefined) resolve(this.connection);
      this.connection = await this.connect();
    });
  }

  public getConnectionStatus(): ConnectionStates {
    return mongoose.connection.readyState;
  }

  public async connect() {
    return await mongoose.connect(`mongodb://localhost:27017/${MONGO_DATABASE}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
  }
}

mongoose.connection.on('connected', function () {
  console.log(colors.green('MongoDB is connected'));
});

mongoose.connection.on('disconencted', function () {
  console.log(colors.blue('MongoDB disconnected'));
});

mongoose.connection.on('err', function (err) {
  console.log(colors.red('MongoDB connction err: '), err);
});
