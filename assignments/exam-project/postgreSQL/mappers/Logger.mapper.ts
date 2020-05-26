import { ILogger } from '../interfaces/ILogger';
import connector from '../services/DBConnector';
const { getPool } = connector;

export default class LoggingMapper {
  public async getAllLogs(): Promise<ILogger[]> {
    return new Promise((resolve, reject) => {
      getPool().query('SELECT * FROM logs', (error, result) => {
        if (error) throw Error(error.message);
        resolve(result.rows as any);
      });
    });
  }
  public async getLast24Hours(): Promise<ILogger> {
    return new Promise((resolve, reject) => {
      getPool().query("SELECT * FROM logs WHERE date >= NOW() - '1 day'::INTERVAL", (error, result) => {
        if (error) throw Error(error.message);
        resolve(result.rows as any);
      });
    });
  }
  public async createLog(method: string, body: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      getPool().query('INSERT INTO logs (method,body) values ($1, $2)', [method, body], (error, result) => {
        if (error) throw Error(error.message);
        resolve(true);
      });
    });
  }
}

export { LoggingMapper };
