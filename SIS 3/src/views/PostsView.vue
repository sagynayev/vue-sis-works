<template>
  <div class="page-top"><h1>posts</h1><RouterLink class="button" to="/posts/new">new post</RouterLink></div>
  <label for="search">search by title</label>
  <input id="search" v-model="search" type="search" placeholder="find a post">
  <p v-if="loading" role="status">loading posts...</p>
  <div v-else-if="error" class="panel"><p class="error" role="alert">{{ error }}</p><button @click="load">try again</button></div>
  <template v-else>
    <p class="muted">{{ filteredPosts.length }} posts</p>
    <p v-if="filteredPosts.length === 0" class="panel">no posts found.</p>
    <div v-else class="post-list">
      <article v-for="post in filteredPosts" :key="post.id" class="panel">
        <h2><RouterLink :to="'/posts/' + post.id">{{ post.title }}</RouterLink></h2>
        <p>{{ post.body.slice(0, 140) }}{{ post.body.length > 140 ? '...' : '' }}</p>
        <RouterLink :to="'/posts/' + post.id">read post →</RouterLink>
      </article>
    </div>
  </template>
</template>

<script>
import { posts, loadPosts } from '../posts';
import { errorMessage } from '../api';

export default {
  data() { return { posts, search: '', loading: true, error: '' }; },
  computed: {
    filteredPosts() {
      return this.posts.items.filter(post => post.title.toLowerCase().includes(this.search.trim().toLowerCase()));
    }
  },
  mounted() { this.load(); },
  methods: {
    async load() {
      this.loading = true;
      this.error = '';
      try { await loadPosts(); }
      catch (error) { this.error = errorMessage(error); }
      finally { this.loading = false; }
    }
  }
};
</script>
