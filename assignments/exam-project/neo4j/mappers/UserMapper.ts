import { connection } from '../services/DBConnector';

class UserMapper {
  create = async (username: string, password: string) => {
    return new Promise(async resolve => {
      await connection.writeTransaction(tx =>
        tx.run('CREATE(n:user{username: $userNameParam, password: $userPasswordParam}) return n.username', {
          userNameParam: username,
          userPasswordParam: password,
        }),
      );
      resolve();
    }).finally(async () => await connection.close());
  };

  follow = async (username: string, userToFollow: string) => {
    return new Promise(async resolve => {
      await connection.writeTransaction(tx =>
        tx.run(
          'Match(a:user{username: $userNameParam1}),(b:user{username: $userNameParam2}) MERGE(a)-[r:FOLLOW]->(b) return a,b',
          {
            userNameParam1: username,
            userNameParam2: userToFollow,
          },
        ),
      );
      resolve();
    }).finally(async () => await connection.close());
  };
}

export { UserMapper };
