<script setup>
defineProps({
  label: { type: String, default: 'Loading content…' },
  compact: { type: Boolean, default: false },
})
</script>

<template>
  <div class="loading-state" :class="{ 'loading-state--compact': compact }" role="status">
    <span class="spinner" />
    <p>{{ label }}</p>
  </div>
</template>
