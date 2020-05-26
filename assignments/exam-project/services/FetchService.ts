import fetch from 'node-fetch';
import { UNIQUE_SERVER_NAME } from '../constants';

class FetchService {
  get = async (url: string) => {
    return await fetch(url, { headers: { origin: UNIQUE_SERVER_NAME } });
  };
  post = async (url: string, body: Object) => {
    return await fetch(url, {
      method: 'post',
      headers: {
        'Content-Type': 'Application/json',
        origin: UNIQUE_SERVER_NAME,
      },
      body: JSON.stringify(body),
    });
  };
  delete = async (url: string, body: Object) => {
    return await fetch(url, {
      method: 'delete',
      headers: {
        origin: UNIQUE_SERVER_NAME,
        'Content-Type': 'Application/json',
      },
      body: JSON.stringify(body),
    });
  };
}

export { FetchService };
