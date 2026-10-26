<template>
  <RouterLink class="back-link" to="/posts">← all posts</RouterLink>
  <p v-if="loading" role="status">loading post...</p>
  <div v-else-if="error" class="panel"><p role="alert" class="error">{{ error }}</p><button @click="load">try again</button></div>
  <section v-else-if="!post" class="panel"><h1>post not found</h1><p>this post does not exist or was deleted.</p></section>
  <article v-else class="panel">
    <h1>{{ post.title }}</h1>
    <p class="post-body">{{ post.body }}</p>
    <p v-if="post.local" class="muted">new demo post: edits and deletion are local to this session.</p>
    <p v-if="deleteError" class="error" role="alert">{{ deleteError }}</p>
    <div v-if="auth.user" class="actions">
      <RouterLink v-if="!deleting" class="button secondary" :to="'/posts/' + post.id + '/edit'">edit</RouterLink>
      <button class="danger" :disabled="deleting" @click="remove">{{ deleting ? 'deleting...' : 'delete' }}</button>
    </div>
    <RouterLink v-else :to="{ path: '/login', query: { redirect: $route.path } }">log in to edit or delete</RouterLink>
  </article>
</template>

<script>
import { findPost, deletePost } from '../posts';
import { auth } from '../auth';
import { errorMessage } from '../api';

export default {
  props: { id: String },
  data() { return { auth, post: null, loading: true, error: '', deleting: false, deleteError: '' }; },
  mounted() { this.load(); },
  methods: {
    async load() {
      this.loading = true;
      this.error = '';
      try { this.post = await findPost(this.id); }
      catch (error) { this.error = errorMessage(error); }
      finally { this.loading = false; }
    },
    async remove() {
      if (!this.auth.user || this.deleting) return;
      if (!window.confirm('delete this post?')) return;
      this.deleting = true;
      this.deleteError = '';
      try {
        await deletePost(this.post);
        this.$router.push('/posts');
      } catch (error) {
        this.deleteError = errorMessage(error);
      } finally {
        this.deleting = false;
      }
    }
  }
};
</script>
