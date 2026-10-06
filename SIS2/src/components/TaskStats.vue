<template>
  <div class="task-stats">
    <div class="stat-box total">
      <span class="label">Total Tasks</span>
      <span class="value">{{ total }}</span>
    </div>
    <div class="stat-box active">
      <span class="label">Active</span>
      <span class="value">{{ active }}</span>
    </div>
    <div class="stat-box completed">
      <span class="label">Completed</span>
      <span class="value">{{ completed }}</span>
    </div>
  </div>
</template>

<script setup>
defineProps({
  total: { type: Number, required: true },
  active: { type: Number, required: true },
  completed: { type: Number, required: true }
})
</script>

<style scoped>
.task-stats {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  justify-content: center;
}

.stat-box {
  background: var(--surface-color);
  padding: 1rem 1.5rem;
  border-radius: 2px;
  border: 1px dashed var(--border-color);
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 120px;
}

.label {
  font-size: 0.75rem;
  font-weight: normal;
  text-transform: lowercase;
  color: var(--text-muted);
  letter-spacing: 0.05em;
}

.value {
  font-size: 1.5rem;
  font-weight: normal;
  color: var(--primary-color);
  margin-top: 0.25rem;
}
</style>
