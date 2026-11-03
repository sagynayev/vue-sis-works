<script setup>
import { CheckCircle2, AlertTriangle, X } from 'lucide-vue-next'
import { dismissToast, toasts } from '../services/toast'
</script>

<template>
  <div class="toast-stack" aria-live="polite">
    <TransitionGroup name="toast">
      <div v-for="toast in toasts" :key="toast.id" class="toast" :class="`toast--${toast.type}`">
        <CheckCircle2 v-if="toast.type === 'success'" :size="19" />
        <AlertTriangle v-else :size="19" />
        <span>{{ toast.message }}</span>
        <button aria-label="Dismiss message" @click="dismissToast(toast.id)"><X :size="16" /></button>
      </div>
    </TransitionGroup>
  </div>
</template>
