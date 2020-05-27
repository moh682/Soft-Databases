import { readFileSync, createReadStream } from 'fs';
import { IUser } from '../neo4j/interfaces/IUser';
import { IPost } from '../mongo/interfaces/IPost';
import { connection } from '../neo4j/services/DBConnector';
import { DBConnector } from '../mongo/services/DBConnector';
import { UserMapper } from '../neo4j/mappers/UserMapper';
const connector = new DBConnector();
connector.connect();

import { PostMapper } from '../mongo/mappers/Post.mapper';
const userMapper = new UserMapper();
const postMapper = new PostMapper();
const getUsers = async (): Promise<IUser[]> => {
  const users_text = await readFileSync(__dirname + '/users.json', 'utf8');
  return JSON.parse(users_text).map(user => {
    return { username: user.username, password: user.username };
  });
};

const getPosts = async (): Promise<IPost[]> => {
  const users_text = await readFileSync(__dirname + '/content.json', 'utf8');
  return JSON.parse(users_text);
};

const submitUsersToDatabase = async () => {
  const users = await getUsers();
  await connection.writeTransaction(async tx => {
    await tx.run('MATCH (n) DETACH DELETE n');
    await tx.run(
      `FOREACH (props IN $users| 
						CREATE (n:User{ username:props.username, password:props.password }))`,
      { users: users },
    );
  });
};

const sumbitFollowersToDatabase = async () => {
  const users = await getUsers();
  const followers = users.map(v => {
    return {
      username1: users[Math.floor(Math.random() * 8000)].username,
      username2: users[Math.floor(Math.random() * 8000)].username,
    };
  });
  await connection.writeTransaction(async tx => {
    const res = await tx.run(
      `UNWIND $pairs AS pair 
			Match(a:User{username: pair.username1}),(b:User{username: pair.username2})
			CREATE (a)-[:FOLLOW]->(b)`,
      { pairs: followers },
    );
    console.log(res);
  });

  // return new Promise(async resolve => {
  //   for (let index = 0; index < followers.length; index++) {
  //     const { username1, username2 } = followers[index];
  //     await userMapper.follow(username1, username2);
  //   }
  return Promise.resolve();
  // });
};

const submitPostsToDatabase = async () => {
  const users = await getUsers();
  let posts = await getPosts();
  posts = posts.map(value => {
    return {
      owner: users[Math.floor(Math.random() * 2000)].username,
      content: value.content,
    };
  });
  await postMapper.deleteAll();
  await postMapper.insertMany(posts);
};

submitPostsToDatabase();
setTimeout(async () => {
  await submitUsersToDatabase().finally(async () => await sumbitFollowersToDatabase());
  process.exit(0);
}, 500);
