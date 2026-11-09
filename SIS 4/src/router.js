import { createRouter, createWebHistory } from 'vue-router';

export default createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: () => import('./views/DashboardView.vue') },
    { path: '/students', component: () => import('./views/StudentsView.vue') },
    { path: '/students/:id', component: () => import('./views/StudentView.vue'), props: true },
    { path: '/tasks', component: () => import('./views/TasksView.vue') },
    { path: '/:pathMatch(.*)*', component: () => import('./views/NotFoundView.vue') }
  ]
});
