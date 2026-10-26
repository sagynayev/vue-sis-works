import { createRouter, createWebHistory } from 'vue-router';
import { auth } from './auth';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: () => import('./views/HomeView.vue') },
    { path: '/posts', component: () => import('./views/PostsView.vue') },
    { path: '/posts/new', component: () => import('./views/CreateView.vue'), meta: { requiresAuth: true } },
    { path: '/posts/:id', component: () => import('./views/PostView.vue'), props: true },
    { path: '/posts/:id/edit', component: () => import('./views/EditView.vue'), props: true, meta: { requiresAuth: true } },
    { path: '/login', component: () => import('./views/LoginView.vue') },
    { path: '/:pathMatch(.*)*', component: () => import('./views/NotFoundView.vue') }
  ],
  scrollBehavior() { return { top: 0 }; }
});

router.beforeEach(to => {
  if (to.meta.requiresAuth && !auth.user) {
    return { path: '/login', query: { redirect: to.fullPath } };
  }
});

export default router;
