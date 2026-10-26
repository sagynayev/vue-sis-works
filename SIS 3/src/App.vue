<template>
  <AppHeader />
  <main class="container">
    <p class="api-note">demo api: post changes stay here until you reload the page.</p>
    <p v-if="auth.message" role="alert" class="error">{{ auth.message }}</p>
    <RouterView :key="$route.fullPath" />
  </main>
  <footer class="container">sis 3 · post board</footer>
</template>

<script>
import AppHeader from './components/AppHeader.vue';
import { auth } from './auth';

export default {
  components: { AppHeader },
  data() { return { auth }; }
};
</script>
