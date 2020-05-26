import { FetchService } from '../services/FetchService';
const { post } = new FetchService();
import { SQL_API } from '../constants';

export const log = async (method, body) => {
  const response = await post(`${SQL_API}/logs/create`, { body, method });
  if (response.status === 201) console.log('log created');
  if (response.status !== 201) console.log('something went wrong with logging');
};
