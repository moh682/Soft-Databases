import { ILogger } from '../interfaces/ILogger';
import connector from '../services/DBConnector';
const { getPool } = connector;

export default class LoggingMapper {
  public async getAllLogs(): Promise<ILogger[]> {
    return new Promise((resolve, reject) => {
      getPool().query('SELECT * FROM logs', (error, result) => {
        if (error) throw Error(error.message);
      });
    });
  }
  public async getLast24Hours(): Promise<ILogger> {
    return new Promise((resolve, reject) => {
      getPool().query("SELECT * FROM logs WHERE date >= NOW() - '1 day'::INTERVAL", (error, result) => {
        if (error) throw Error(error.message);
        resolve();
      });
    });
  }
}
