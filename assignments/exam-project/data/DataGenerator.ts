import { readFileSync, createReadStream } from 'fs';
import { IUser } from '../neo4j/interfaces/IUser';
import { connection } from '../neo4j/services/DBConnector';

const getUsers = async (): Promise<IUser[]> => {
  const users_text = await readFileSync(__dirname + '/users.json', 'utf8');
  return JSON.parse(users_text).map(arr => {
    return { username: arr[0], password: arr[1] };
  });
};

const getText = async () => {
  new Promise(resolve => {
    const data = [];
    const users_text = createReadStream(__dirname + '/text.text', 'utf8')
      .on('data', (str: string) => {
        data.push(str.split('\n'));
      })
      .on('end', () => {
        resolve(data);
      });
  });
};

const submitUsersToDatabase = async () => {
  const users = await getUsers();
  try {
    const u = await connection.writeTransaction(tx =>
      tx.run(
        `CREATE${users
          .map(({ username, password }) => {
            return `(n:user {username: ${username}, password: ${password}})`;
          })
          .join(',')}`,
      ),
    );
  } catch (ex) {
    console.log(ex);
  }
};

submitUsersToDatabase();

getText();
