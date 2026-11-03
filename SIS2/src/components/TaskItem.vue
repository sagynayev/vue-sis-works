<template>
  <div :class="['task-item', { completed: task.status === 'completed' }]">
    <div class="task-content">
      <div class="task-header">
        <div class="title-wrapper">
          <span class="priority-dot" :class="task.priority"></span>
          <h3 class="title" :class="{ 'line-through': task.status === 'completed' }">
            {{ task.title }}
          </h3>
        </div>
        <span class="date">{{ formatDate(task.createdAt) }}</span>
      </div>
      
      <p class="description" v-if="task.description">{{ task.description }}</p>
      
      <div class="task-badges">
        <span class="badge status-badge" :class="task.status">
          {{ task.status === 'completed' ? 'Done' : 'Active' }}
        </span>
        <span class="badge priority-badge" :class="task.priority">
          {{ task.priority }}
        </span>
        <slot name="extra-badges"></slot>
      </div>
    </div>
    
    <div class="task-actions">
      <BaseButton 
        variant="success" 
        @click="$emit('toggle-status')"
      >
        {{ task.status === 'completed' ? 'Undo' : 'Complete' }}
      </BaseButton>
      
      <BaseButton 
        variant="secondary" 
        @click="$emit('edit')"
      >
        Edit
      </BaseButton>
      
      <BaseButton 
        variant="danger" 
        @click="$emit('delete')"
      >
        Delete
      </BaseButton>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  task: {
    type: Object,
    required: true
  }
})

defineEmits(['toggle-status', 'edit', 'delete'])

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}
</script>

<style scoped>
.task-item {
  background: var(--surface-color);
  padding: 1.25rem;
  border-radius: 2px;
  border: 1px dashed var(--border-color);
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  transition: all 0.2s ease;
}

.task-item:hover {
  border-color: var(--primary-color);
}

.task-item.completed {
  opacity: 0.5;
  background-color: transparent;
  border: 1px dotted var(--border-color);
}

.task-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.title-wrapper {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.priority-dot {
  width: 8px;
  height: 8px;
  border-radius: 0;
}
.priority-dot.high { background-color: #ff5555; }
.priority-dot.medium { background-color: #ffff55; }
.priority-dot.low { background-color: #55ff55; }

.title {
  margin: 0;
  font-size: 1.125rem;
  color: var(--text-color);
  text-align: left;
}

.line-through {
  text-decoration: line-through;
  color: var(--text-muted);
}

.date {
  font-size: 0.75rem;
  color: var(--text-muted);
}

.description {
  color: var(--text-muted);
  font-size: 0.875rem;
  line-height: 1.5;
}

.task-badges {
  display: flex;
  gap: 0.5rem;
  margin-top: 0.5rem;
}

.badge {
  padding: 0.15rem 0.4rem;
  border-radius: 2px;
  font-size: 0.75rem;
  font-weight: normal;
  border: 1px solid var(--border-color);
  text-transform: lowercase;
}

.status-badge.completed { color: #55ff55; border-color: #55ff55; }
.status-badge.active { color: var(--text-color); border-color: var(--text-color); }

.priority-badge.high { color: #ff5555; border-color: #ff5555; }
.priority-badge.medium { color: #ffff55; border-color: #ffff55; }
.priority-badge.low { color: #55ff55; border-color: #55ff55; }

.task-actions {
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
}

@media (min-width: 600px) {
  .task-item {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
  .task-actions {
    margin-top: 0;
    flex-direction: row;
  }
}
</style>
