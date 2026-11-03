<script setup>
import { AlertCircle, RotateCcw } from 'lucide-vue-next'

defineProps({
  title: { type: String, default: 'Something went wrong' },
  message: { type: String, default: 'We could not load this content. Please try again.' },
})

defineEmits(['retry'])
</script>

<template>
  <div class="error-state" role="alert">
    <span class="error-state__icon"><AlertCircle :size="24" /></span>
    <div>
      <h3>{{ title }}</h3>
      <p>{{ message }}</p>
    </div>
    <button class="button button--secondary" @click="$emit('retry')">
      <RotateCcw :size="16" /> Retry
    </button>
  </div>
</template>
