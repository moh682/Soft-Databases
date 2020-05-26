import fetch from 'node-fetch';
import { SQL_API } from '../constants';

export const log = async (method, body) => {
  const response = await fetch(`${SQL_API}/logger/create`, {
    method: 'POST',
    body: JSON.stringify({ method, ...body }),
    headers: { 'Content-Type': 'application/json' },
  });
  if (response.status === 201) console.log('log created');
  if (response.status !== 201) console.log('something went wrong with logging');
};
