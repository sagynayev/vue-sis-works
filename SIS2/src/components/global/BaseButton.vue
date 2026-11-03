<template>
  <button 
    :class="['base-button', variant]" 
    :type="type"
  >
    <slot></slot>
  </button>
</template>

<script setup>
defineProps({
  variant: {
    type: String,
    default: 'primary',
    validator: (value) => ['primary', 'secondary', 'accent', 'danger', 'success'].includes(value)
  },
  type: {
    type: String,
    default: 'button'
  }
})
</script>

<style scoped>
.base-button {
  font-family: var(--font-main);
  font-weight: normal;
  font-size: 0.875rem;
  padding: 0.5rem 1rem;
  border-radius: 2px;
  cursor: pointer;
  transition: all 0.1s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--border-color);
  background: var(--surface-color);
  color: var(--primary-color);
  box-shadow: 2px 2px 0px rgba(0,255,0,0.2);
}

.base-button:active {
  transform: translateY(2px) translateX(2px);
  box-shadow: 0px 0px 0px transparent;
}

.primary {
  border-color: var(--primary-color);
  box-shadow: 2px 2px 0px var(--primary-color);
}
.primary:hover {
  background-color: rgba(0, 255, 0, 0.1);
}

.secondary {
  color: var(--text-color);
  border-color: var(--text-color);
  box-shadow: 2px 2px 0px var(--text-color);
}
.secondary:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.danger {
  color: #ff5555;
  border-color: #ff5555;
  box-shadow: 2px 2px 0px #ff5555;
}
.danger:hover {
  background-color: rgba(255, 85, 85, 0.1);
}

.success {
  color: #55ff55;
  border-color: #55ff55;
  box-shadow: 2px 2px 0px #55ff55;
}
.success:hover {
  background-color: rgba(85, 255, 85, 0.1);
}
</style>
