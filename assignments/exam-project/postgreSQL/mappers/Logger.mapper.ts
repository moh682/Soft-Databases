import { ILogger } from '../interfaces/ILogger';
import fs from 'fs';
import colors from 'colors';
import connector from '../services/DBConnector';
const { getPool } = connector;

export default class LoggingMapper {
  public async getAllLogs(): Promise<ILogger[]> {
    return new Promise((resolve, reject) => {
      getPool().query('SELECT * FROM db_exam.logs', (error, result) => {
        if (error) throw Error(error.message);
        resolve(result.rows as any);
      });
    });
  }
  public async getLast24Hours(): Promise<ILogger> {
    return new Promise((resolve, reject) => {
      getPool().query(
        "SELECT * FROM db_exam.logs WHERE date >= LOCALTIMESTAMP(0) - '1 day'::INTERVAL",
        (error, result) => {
          if (error) throw Error(error.message);
          resolve(result.rows as any);
        },
      );
    });
  }
  public async createLog(method: string, body: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      getPool().query('INSERT INTO db_exam.logs (method,body) values ($1, $2)', [method, body], (error, result) => {
        if (error) throw Error(error.message);
        resolve(true);
      });
    });
  }
  public async injectFile(): Promise<void> {
    return new Promise(async (resolve, reject) => {
      var sql = fs.readFileSync(__dirname + '/../sql.sql').toString();
      getPool().query(sql, function (err, result) {
        if (err) {
          console.log('error: ', err);
          process.exit(1);
        }
        console.log(colors.blue('injecting file succeeded'));
      });
    });
  }
}

export { LoggingMapper };
