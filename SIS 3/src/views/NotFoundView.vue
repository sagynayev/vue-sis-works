<script setup>
import { ArrowLeft, Compass } from 'lucide-vue-next'
</script>

<template>
  <section class="not-found">
    <div class="not-found__art" aria-hidden="true">
      <span>4</span><div><Compass :size="64" /></div><span>4</span>
    </div>
    <p class="eyebrow">This page wandered off</p>
    <h2>There’s no story here. Yet.</h2>
    <p>The address may be incorrect, or the page may have moved somewhere new.</p>
    <RouterLink to="/" class="button button--primary"><ArrowLeft :size="18" /> Return to overview</RouterLink>
  </section>
</template>
