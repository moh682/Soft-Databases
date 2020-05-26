import { NEO4J_API } from '../../constants';
import { TokenService } from '../services/TokenService';
import { FetchService } from '../../services/FetchService';
import { SessionMapper } from '../mappers/SessionMapper';
const { get, post } = new FetchService();

const tokenService = new TokenService();
const sessionMapper = new SessionMapper();
class AuthenticationLogic {
  login = async (username, password): Promise<string> => {
    const user = await get(`${NEO4J_API}/user/find/username/${username}`).then(response => {
      return response.json();
    });
    if (!user) return undefined; // if user does not exist;
    if (password !== user['password']) return undefined;

    const token = tokenService.create(username);
    sessionMapper.set(`name:${username}`, token);

    return token;
  };
  register = async (username, password): Promise<string> => {
    const user = await get(`${NEO4J_API}/user/find/username/${username}`).then(response => {
      return response.json();
    });
    if (Object.keys(user).length > 0) return undefined;
    const isCreated = await post(`${NEO4J_API}/user/create`, { username, password }).then(response => {
      return response.status === 200;
    });
    if (!isCreated) return undefined;

    const token = tokenService.create(username);
    sessionMapper.set(`name:${username}`, token);

    return token;
  };
}

export { AuthenticationLogic };
