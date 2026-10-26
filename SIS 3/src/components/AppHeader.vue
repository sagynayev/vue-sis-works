<template>
  <header>
    <div class="container header-content">
      <RouterLink class="logo" to="/">post board</RouterLink>
      <nav aria-label="main navigation">
        <RouterLink to="/">home</RouterLink>
        <RouterLink to="/posts">posts</RouterLink>
        <RouterLink to="/posts/new">new post</RouterLink>
        <template v-if="auth.user">
          <span class="user-name">{{ auth.user.name }}</span>
          <button class="secondary" @click="leave">log out</button>
        </template>
        <RouterLink v-else to="/login">log in</RouterLink>
      </nav>
    </div>
  </header>
</template>

<script>
import { auth, logout } from '../auth';

export default {
  data() { return { auth }; },
  methods: {
    leave() {
      logout();
      if (this.$route.meta.requiresAuth) this.$router.push('/login');
    }
  }
};
</script>
