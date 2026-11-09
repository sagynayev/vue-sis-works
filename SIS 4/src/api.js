import axios from 'axios';

const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  timeout: 10000
});

const taskNames = [
  'check the class schedule',
  'read the new lesson',
  'finish the math homework',
  'prepare for the quiz',
  'send the project draft',
  'review lecture notes',
  'practice english words',
  'solve coding exercises',
  'update the study plan',
  'join the group meeting',
  'write a short report',
  'study for the exam',
  'check teacher feedback',
  'finish the lab work',
  'read one chapter',
  'make presentation slides',
  'submit the assignment',
  'practice speaking',
  'organize class notes',
  'plan next week'
];

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
  return response.data.map(task => ({
    ...task,
    title: taskNames[(task.id - 1) % taskNames.length]
  }));
}
