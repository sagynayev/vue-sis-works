import { reactive } from 'vue';
import { api } from './api';

export const posts = reactive({ items: [], loaded: false, nextId: 101 });

export async function loadPosts() {
  if (posts.loaded) return;
  const response = await api.get('/posts');
  if (!Array.isArray(response.data)) throw new Error('invalid response');
  posts.items = response.data;
  posts.loaded = true;
}

export async function findPost(id) {
  await loadPosts();
  return posts.items.find(post => post.id === Number(id));
}

export async function addPost(fields) {
  await loadPosts();
  const response = await api.post('/posts', { title: fields.title, body: fields.body, userId: 1 });
  const post = {
    ...response.data,
    id: posts.nextId,
    local: true
  };
  posts.nextId++;
  posts.items.unshift(post);
  return post;
}

export async function updatePost(post, fields) {
  if (!post.local) {
    await api.put('/posts/' + post.id, {
      id: post.id,
      userId: post.userId,
      title: fields.title,
      body: fields.body
    });
  }
  post.title = fields.title;
  post.body = fields.body;
}

export async function deletePost(post) {
  if (!post.local) {
    await api.delete('/posts/' + post.id);
  }
  const index = posts.items.findIndex(item => item.id === post.id);
  if (index !== -1) posts.items.splice(index, 1);
}
