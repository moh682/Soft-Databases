import { connection } from '../services/DBConnector';
import { IUser } from '../interfaces/IUser';

class UserMapper {
  create = async (username: string, password: string) => {
    return new Promise(async resolve => {
      await connection.writeTransaction(async tx => {
        const res: any = await tx.run('CREATE(n:User{username: $username, password: $password}) return n', {
          username,
          password,
        });
        resolve(res?.records[0]?._fields[0]?.properties);
      });
    });
  };

  find = async (username: string) => {
    return new Promise(async resolve => {
      await connection.writeTransaction(async tx => {
        try {
          const res: any = await tx.run('Match(n:User{username: $userNameParam}) return n', {
            userNameParam: username,
          });
          tx.commit();
          resolve(res?.records[0]?._fields[0]?.properties);
        } catch (error) {
          console.log(error);
        }
      });
    });
  };

  findAll = async () => {
    return new Promise(async resolve => {
      await connection.writeTransaction(async tx => {
        try {
          const res: any = await tx.run('Match(n:User) return n');
          tx.commit();
          resolve(res.records.map(record => record?._fields[0]?.properties));
        } catch (error) {
          console.log(error);
        }
      });
    });
  };

  follow = async (username: string, userToFollow: string) => {
    return new Promise(async resolve => {
      await connection.writeTransaction(async tx => {
        const res = await tx.run(
          'Match(a:User{username: $userNameParam1}),(b:User{username: $userNameParam2}) MERGE(a)-[r:FOLLOW]->(b) return a,b',
          {
            userNameParam1: username,
            userNameParam2: userToFollow,
          },
        );
        console.log(res);
        resolve(res);
      });
    });
  };
}

export { UserMapper };
