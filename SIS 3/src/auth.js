import { reactive } from 'vue';

export const auth = reactive({ user: null, message: '' });

try {
  const saved = JSON.parse(localStorage.getItem('sis3-user') || 'null');
  if (saved && typeof saved.name === 'string' && saved.name.trim() && typeof saved.email === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(saved.email)) {
    auth.user = saved;
  }
} catch {
  auth.message = 'saved login could not be loaded. please log in again.';
}

export function login(name, email) {
  auth.user = { name: name.trim(), email: email.trim() };
  try {
    localStorage.setItem('sis3-user', JSON.stringify(auth.user));
    auth.message = '';
  } catch {
    auth.message = 'login works for now, but your browser could not save it.';
  }
}

export function logout() {
  auth.user = null;
  try {
    localStorage.removeItem('sis3-user');
    auth.message = '';
  } catch {
    auth.message = 'could not clear saved login. check your browser storage settings.';
  }
}
