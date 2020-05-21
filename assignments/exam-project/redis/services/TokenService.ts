import { TOKEN_SECRET } from '../../constants';
import { sign, verify, decode } from 'jsonwebtoken';

class TokenService {
  create = (data: Object) => {
    return sign(data, TOKEN_SECRET, {
      issuer: 'exam-project',
    });
  };
  verify = (token: string): boolean => {
    let payload: Object;
    try {
      payload = verify(token, TOKEN_SECRET);
    } catch (e) {
      return false;
    }
    if (!payload) return false;
    return true;
  };

  decode = (token: string): Object => {
    return decode(token);
  };
}

export { TokenService };
