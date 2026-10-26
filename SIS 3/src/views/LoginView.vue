<template>
  <section class="panel login-panel">
    <h1>log in</h1>
    <p>demo login. use any name and a test email, no password needed.</p>
    <form @submit.prevent="submit" novalidate>
      <label for="name">name</label>
      <input id="name" v-model="name" autocomplete="name" maxlength="80" required>
      <label for="email">email</label>
      <input id="email" v-model="email" type="email" autocomplete="email" maxlength="160" required>
      <p v-if="error" class="error" role="alert">{{ error }}</p>
      <button type="submit">log in</button>
    </form>
  </section>
</template>

<script>
import { login } from '../auth';

export default {
  data() { return { name: '', email: '', error: '' }; },
  methods: {
    submit() {
      if (this.name.trim().length < 2) {
        this.error = 'enter a name with at least 2 characters.';
        return;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email.trim())) {
        this.error = 'enter a valid email.';
        return;
      }
      login(this.name, this.email);
      const path = this.$route.query.redirect;
      const allowed = typeof path === 'string' && /^\/posts(\/(new|\d+)(\/edit)?)?$/.test(path);
      this.$router.replace(allowed ? path : '/posts');
    }
  }
};
</script>
