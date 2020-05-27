import { connection } from '../services/DBConnector';
import { IUser } from '../interfaces/IUser';

class UserMapper {
  create = async (username: string, password: string) => {
    return new Promise(async resolve => {
      await connection.writeTransaction(async tx => {
        const res: any = await tx.run('CREATE(n:user{username: $username, password: $password}) return n', {
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
          const res: any = await tx.run('Match(n:user{username: $userNameParam}) return n', {
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
          const res: any = await tx.run('Match(n:user) return n');
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
          'Match(a:user{username: $userNameParam1}),(b:user{username: $userNameParam2}) MERGE(a)-[r:FOLLOW]->(b) return a,b',
          {
            userNameParam1: username,
            userNameParam2: userToFollow,
          },
        );
        tx.commit();
        resolve(res);
      });
    });
  };
}

export { UserMapper };
