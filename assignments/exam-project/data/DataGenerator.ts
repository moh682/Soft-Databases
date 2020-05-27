import { readFileSync, createReadStream } from 'fs';

const getUsers = async () => {
  new Promise(resolve => {
    const users_text = readFileSync(__dirname + '/users.json', 'utf8');
    resolve(JSON.parse(users_text));
  });
};

const getText = async () => {
  new Promise(resolve => {
    const data = [];
    const users_text = createReadStream(__dirname + '/text.text', 'utf8')
      .on('data', str => data.push(str))
      .on('end', () => {
        console.log(data);
      });
  });
};

getUsers();
getText();
