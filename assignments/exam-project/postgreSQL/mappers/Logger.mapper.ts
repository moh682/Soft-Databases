import mysql, { Connection } from 'pg';
import { IUser } from '../../interfaces/IUser';
import ErrorHandler from '../../services/ErrorHandlers';
import connector from '../services/DBConnector';
const { getPool } = connector;
import { connect } from 'tls';

export default class LoggingMapper {
  public async getAllAccounts(): Promise<IUser[]> {
    let thisInstance = this;
    return new Promise(function (resolve, reject) {
      let users: IUser[] = [];
      let sqlOptions: mysql.QueryOptions = {
        sql: 'SELECT * FROM users',
      };
      try {
        getPool().connect((error, connection) => {
          if (error) console.log(error);
          connection.query(sqlOptions, (error, res) => {
						
					})
          });
        });
      } catch (exception) {
        ErrorHandler.mySqlQueryErrorHandler(exception.name, __filename, exception);
      }
    });
  }
}
