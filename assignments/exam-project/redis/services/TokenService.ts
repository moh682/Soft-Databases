import { TOKEN_SECRET } from '../../constants';
import { sign, verify, decode } from 'jsonwebtoken';

class TokenService {
  create = (data: Object) => {
    return sign({ ...data }, TOKEN_SECRET, {
      issuer: 'exam-project',
    });
  };
  verify = (token: string): Object => {
    let payload: Object;
    try {
      payload = verify(token, TOKEN_SECRET);
    } catch (e) {
      return false;
    }
    return payload;
  };
  decode = (token: string): Object => {
    return decode(token);
  };
}

export { TokenService };
