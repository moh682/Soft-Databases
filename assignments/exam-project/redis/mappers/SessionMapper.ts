import { client } from '../services/DBConnectorService';
class SessionMapper {
  get = async (key: string): Promise<string> => {
    return new Promise(resolve => {
      client.get(key, (error, reply) => {
        if (error) throw new Error(error.message);
        resolve(reply);
      });
    });
  };
  set = async (key: string, value: string): Promise<boolean> => {
    return new Promise(resolve => {
      client.set(key, value, (error, reply) => {
        if (error) throw new Error(error.message);
        client.expire(key, 60 * 60 * 12, (error, reply) => {
          if (error) throw new Error(error.message);
          resolve(true);
        });
      });
    });
  };
}

export { SessionMapper };
