<script setup>
import { ref } from 'vue'
import { RouterLink, RouterView, useRoute, useRouter } from 'vue-router'
import {
  BookOpen,
  LayoutDashboard,
  Menu,
  Newspaper,
  Users,
  Info,
  LogOut,
  Search,
  X,
} from 'lucide-vue-next'
import { authState, logout } from '../services/auth'

const route = useRoute()
const router = useRouter()
const mobileOpen = ref(false)

const navigation = [
  { label: 'Overview', to: '/', icon: LayoutDashboard },
  { label: 'Stories', to: '/stories', icon: Newspaper },
  { label: 'Contributors', to: '/people', icon: Users },
  { label: 'About', to: '/about', icon: Info },
]

function isActive(item) {
  if (item.to === '/') return route.path === '/'
  return route.path.startsWith(item.to)
}

function signOut() {
  logout()
  router.push('/login')
}
</script>

<template>
  <div class="app-shell">
    <div v-if="mobileOpen" class="mobile-scrim" @click="mobileOpen = false" />

    <aside class="sidebar" :class="{ 'sidebar--open': mobileOpen }">
      <div class="brand-row">
        <RouterLink to="/" class="brand" @click="mobileOpen = false">
          <span class="brand-mark"><BookOpen :size="20" /></span>
          <span>Pulseboard</span>
        </RouterLink>
        <button class="icon-button sidebar-close" aria-label="Close menu" @click="mobileOpen = false">
          <X :size="20" />
        </button>
      </div>

      <p class="nav-label">Workspace</p>
      <nav class="main-nav" aria-label="Main navigation">
        <RouterLink
          v-for="item in navigation"
          :key="item.to"
          :to="item.to"
          class="nav-link"
          :class="{ 'nav-link--active': isActive(item) }"
          @click="mobileOpen = false"
        >
          <component :is="item.icon" :size="19" :stroke-width="1.8" />
          <span>{{ item.label }}</span>
          <span v-if="item.to === '/stories'" class="nav-count">12</span>
        </RouterLink>
      </nav>

      <div class="sidebar-note">
        <span class="sidebar-note__dot" />
        <div>
          <strong>API connected</strong>
          <small>DummyJSON service</small>
        </div>
      </div>

      <div class="user-card">
        <div class="avatar avatar--dark">{{ authState.user?.initials }}</div>
        <div class="user-card__copy">
          <strong>{{ authState.user?.name }}</strong>
          <small>Managing editor</small>
        </div>
        <button class="icon-button" aria-label="Sign out" title="Sign out" @click="signOut">
          <LogOut :size="18" />
        </button>
      </div>
    </aside>

    <main class="main-area">
      <header class="topbar">
        <div class="topbar__title">
          <button class="icon-button menu-button" aria-label="Open menu" @click="mobileOpen = true">
            <Menu :size="22" />
          </button>
          <div>
            <p>{{ route.meta.eyebrow }}</p>
            <h1>{{ route.meta.title }}</h1>
          </div>
        </div>
        <div class="topbar__actions">
          <RouterLink to="/stories" class="search-pill" aria-label="Search stories">
            <Search :size="17" />
            <span>Search stories</span>
            <kbd>/</kbd>
          </RouterLink>
          <div class="avatar avatar--coral">AM</div>
        </div>
      </header>

      <div class="page-container">
        <RouterView />
      </div>
    </main>
  </div>
</template>
