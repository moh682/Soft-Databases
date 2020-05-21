import { UserMapper } from '../../neo4j/mappers/UserMapper';
import { TokenService } from './TokenService';

const userMapper = new UserMapper();
const tokenService = new TokenService();
class AuthenticationService {
  login = async (username: string, password: string): Promise<string> => {
    return new Promise(async resolve => {
      const user: any = await userMapper.find(username);
      if (!user || user.password !== password) resolve(undefined);
      const token = tokenService.create(user.username);
      resolve(token);
    });
  };
  register = async (username: string, password) => {
    return new Promise(async resolve => {
      const user: any = await userMapper.create(username, password);
      if (!user || user.password !== password) resolve(undefined);
      const token = tokenService.create(user.username);
      resolve(token);
    });
  };
}

export { AuthenticationService };
