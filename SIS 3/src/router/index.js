import { createRouter, createWebHistory } from 'vue-router'
import { isAuthenticated } from '../services/auth'

const router = createRouter({
  history: createWebHistory(),
  scrollBehavior: () => ({ top: 0 }),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
      meta: { guestOnly: true, title: 'Sign in' },
    },
    {
      path: '/',
      component: () => import('../components/AppShell.vue'),
      meta: { requiresAuth: true },
      children: [
        {
          path: '',
          name: 'dashboard',
          component: () => import('../views/DashboardView.vue'),
          meta: { title: 'Good afternoon, Alex', eyebrow: 'Overview' },
        },
        {
          path: 'stories',
          name: 'stories',
          component: () => import('../views/StoriesView.vue'),
          meta: { title: 'Stories', eyebrow: 'Content library' },
        },
        {
          path: 'stories/:id',
          name: 'story-detail',
          component: () => import('../views/StoryDetailView.vue'),
          meta: { title: 'Story details', eyebrow: 'Content library' },
        },
        {
          path: 'people',
          name: 'people',
          component: () => import('../views/PeopleView.vue'),
          meta: { title: 'Contributors', eyebrow: 'People directory' },
        },
        {
          path: 'about',
          name: 'about',
          component: () => import('../views/AboutView.vue'),
          meta: { title: 'About Pulseboard', eyebrow: 'Project notes' },
        },
        {
          path: ':pathMatch(.*)*',
          name: 'not-found',
          component: () => import('../views/NotFoundView.vue'),
          meta: { title: 'Page not found', eyebrow: '404 error' },
        },
      ],
    },
  ],
})

router.beforeEach((to) => {
  if (to.meta.requiresAuth && !isAuthenticated.value) {
    return { name: 'login', query: { redirect: to.fullPath } }
  }

  if (to.meta.guestOnly && isAuthenticated.value) {
    return { name: 'dashboard' }
  }

  document.title = `${to.meta.title || 'Pulseboard'} — Pulseboard`
})

export default router
