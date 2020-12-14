import config from '../config';
import TokenService from './token-service';

export const fetchLanguage = () => {
  return fetch(`${config.API_ENDPOINT}/language`, {
    method: 'GET',
    headers: {
      'content-type': 'application/json',
      authorization: `bearer ${TokenService.getAuthToken()}`,
    },
  }).then(res => {
    if (!res.ok) {
      return Promise.reject(res.statusText);
    }
    return res.json();
  });
};
