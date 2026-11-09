<template>
  <div v-if="loading" class="state-box"><a-spin tip="loading..." /></div>
  <a-alert v-else-if="error" type="error" :message="error" show-icon>
    <template #action><a-button size="small" @click="$emit('retry')">try again</a-button></template>
  </a-alert>
  <slot v-else />
</template>

<script>
export default {
  props: {
    loading: Boolean,
    error: String
  },
  emits: ['retry']
};
</script>
