<template>
  <section class="panel">
    <h1>edit post</h1>
    <p v-if="loading" role="status">loading post...</p>
    <div v-else-if="loadError"><p class="error" role="alert">{{ loadError }}</p><button @click="load">try again</button></div>
    <p v-else-if="!post">post not found. <RouterLink to="/posts">back to posts</RouterLink></p>
    <template v-else>
      <p v-if="post.local" class="muted">this new post is edited locally because the demo api does not store new records.</p>
      <p v-if="error" role="alert" class="error">{{ error }}</p>
      <PostForm :post="post" :busy="saving" @save="save" />
    </template>
  </section>
</template>

<script>
import PostForm from '../components/PostForm.vue';
import { findPost, updatePost } from '../posts';
import { auth } from '../auth';
import { errorMessage } from '../api';

export default {
  components: { PostForm },
  props: { id: String },
  data() { return { post: null, loading: true, loadError: '', saving: false, error: '' }; },
  mounted() { this.load(); },
  methods: {
    async load() {
      this.loading = true;
      this.loadError = '';
      try { this.post = await findPost(this.id); }
      catch (error) { this.loadError = errorMessage(error); }
      finally { this.loading = false; }
    },
    async save(fields) {
      if (!auth.user || this.saving) return;
      this.saving = true;
      this.error = '';
      try {
        await updatePost(this.post, fields);
        this.$router.push('/posts/' + this.post.id);
      } catch (error) {
        this.error = errorMessage(error);
      } finally {
        this.saving = false;
      }
    }
  }
};
</script>
