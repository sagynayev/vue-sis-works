import axios from 'axios';

const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  timeout: 10000
});

export async function getStudents() {
  const response = await api.get('/users');
  return response.data;
}

export async function getStudent(id) {
  const response = await api.get('/users/' + id);
  return response.data;
}

export async function getTasks() {
  const response = await api.get('/todos');
  return response.data;
}
