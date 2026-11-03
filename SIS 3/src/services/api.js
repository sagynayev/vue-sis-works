import axios from 'axios'

const api = axios.create({
  baseURL: 'https://dummyjson.com',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

export async function fetchPosts(limit = 12) {
  const { data } = await api.get('/posts', { params: { limit } })
  return data.posts
}

export async function fetchPost(id) {
  const { data } = await api.get(`/posts/${id}`)
  return data
}

export async function createPost(payload) {
  const { data } = await api.post('/posts/add', payload)
  return data
}

export async function updatePost(id, payload) {
  const { data } = await api.put(`/posts/${id}`, payload)
  return data
}

export async function deletePost(id) {
  const { data } = await api.delete(`/posts/${id}`)
  return data
}

export async function fetchUsers(limit = 12) {
  const { data } = await api.get('/users', { params: { limit } })
  return data.users
}

export async function fetchRandomQuote() {
  const { data } = await api.get('/quotes/random')
  return data
}

export default api
