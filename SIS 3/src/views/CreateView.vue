<template>
  <section class="panel">
    <h1>new post</h1>
    <p v-if="error" role="alert" class="error">{{ error }}</p>
    <PostForm :busy="saving" @save="save" />
  </section>
</template>

<script>
import PostForm from '../components/PostForm.vue';
import { addPost } from '../posts';
import { auth } from '../auth';
import { errorMessage } from '../api';

export default {
  components: { PostForm },
  data() { return { saving: false, error: '' }; },
  methods: {
    async save(fields) {
      if (!auth.user || this.saving) return;
      this.saving = true;
      this.error = '';
      try {
        const post = await addPost(fields);
        this.$router.push('/posts/' + post.id);
      } catch (error) {
        this.error = errorMessage(error);
      } finally {
        this.saving = false;
      }
    }
  }
};
</script>
