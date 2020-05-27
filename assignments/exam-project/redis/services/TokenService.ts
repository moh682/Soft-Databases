import { TOKEN_SECRET } from '../../constants';
import { sign, verify, decode } from 'jsonwebtoken';

class TokenService {
  create = (data: Object) => {
    return sign(
      {
        username: data,
      },
      TOKEN_SECRET,
      {
        issuer: 'exam-project',
      },
    );
  };
  verify = (token: string): Object => {
    let payload: Object;
    try {
      payload = verify(token, TOKEN_SECRET);
    } catch (e) {
      return false;
    }
    console.log(payload);
    return payload;
  };
  decode = (token: string): Object => {
    return decode(token);
  };
}

export { TokenService };
