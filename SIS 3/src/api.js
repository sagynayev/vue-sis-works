import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  timeout: 15000
});

export function errorMessage(error) {
  if (!error.response) {
    return 'could not connect to the server. check your connection and try again.';
  }
  if (error.response.status === 404) {
    return 'this post was not found.';
  }
  return 'the request failed. please try again.';
}
