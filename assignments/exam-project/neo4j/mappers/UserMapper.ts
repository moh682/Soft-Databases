import { connection } from '../services/DBConnector';

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
        tx.commit();
        resolve(res);
      });
    });
  };

  getMostFollowed = async () => {
    return new Promise(async resolve => {
      await connection.writeTransaction(async tx => {
        const res = await tx.run(
          `MATCH (n:User)<-[r]-(x)
					RETURN n.username as username, COUNT(r) as followers
					ORDER BY COUNT(r) DESC
					LIMIT 10`,
        );
        tx.commit();
        resolve(
          res.records.map((record: any) => {
            return {
              username: record?._fields[0],
              followers: record?._fields[1].low,
            };
          }),
        );
      });
    });
  };

  getMostImportant = async () => {
    return new Promise(async resolve => {
      await connection.writeTransaction(async tx => {
        const res = await tx.run(
          `CALL gds.alpha.articleRank.stream({
						nodeProjection: 'User',
						relationshipProjection: 'FOLLOW',
						maxIterations: 20, dampingFactor: 0.85 })
					YIELD nodeId, score
					RETURN gds.util.asNode(nodeId).username AS name, score
					ORDER BY score DESC, name ASC LIMIT 10`,
        );
        tx.commit();
        resolve(
          res.records.map((record: any) => {
            return {
              username: record?._fields[0],
              score: record?._fields[1],
            };
          }),
        );
      });
    });
  };
}

export { UserMapper };
