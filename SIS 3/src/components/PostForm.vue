<template>
  <form @submit.prevent="submit" novalidate>
    <fieldset :disabled="busy">
      <legend class="sr-only">post details</legend>
      <label for="post-title">title</label>
      <input id="post-title" v-model="title" maxlength="200" required>
      <label for="post-body">text</label>
      <textarea id="post-body" v-model="body" rows="8" maxlength="5000" required></textarea>
      <p v-if="error" role="alert" class="error">{{ error }}</p>
      <div class="actions">
        <button type="submit">{{ busy ? 'saving...' : 'save post' }}</button>
        <RouterLink class="button secondary" to="/posts">cancel</RouterLink>
      </div>
    </fieldset>
  </form>
</template>

<script>
export default {
  props: {
    post: { type: Object, default: () => ({ title: '', body: '' }) },
    busy: Boolean
  },
  emits: ['save'],
  data() { return { title: this.post.title, body: this.post.body, error: '' }; },
  methods: {
    submit() {
      if (this.busy) return;
      if (!this.title.trim() || !this.body.trim()) {
        this.error = 'fill in the title and text.';
        return;
      }
      this.error = '';
      this.$emit('save', { title: this.title.trim(), body: this.body.trim() });
    }
  }
};
</script>
