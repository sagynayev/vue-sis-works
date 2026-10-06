<template>
  <div class="task-filter">
    <div class="search-box">
      <input 
        type="text" 
        :value="searchQuery" 
        @input="$emit('update:searchQuery', $event.target.value)"
        placeholder="search stuff..." 
      />
    </div>
    
    <div class="filters">
      <select :value="filterStatus" @change="$emit('update:filterStatus', $event.target.value)">
        <option value="all">All Status</option>
        <option value="active">Active</option>
        <option value="completed">Completed</option>
      </select>
      
      <select :value="filterPriority" @change="$emit('update:filterPriority', $event.target.value)">
        <option value="all">All Priorities</option>
        <option value="high">High</option>
        <option value="medium">Medium</option>
        <option value="low">Low</option>
      </select>
    </div>
  </div>
</template>

<script setup>
defineProps({
  searchQuery: { type: String, default: '' },
  filterStatus: { type: String, default: 'all' },
  filterPriority: { type: String, default: 'all' }
})

defineEmits(['update:searchQuery', 'update:filterStatus', 'update:filterPriority'])
</script>

<style scoped>
.task-filter {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 2rem;
  background: var(--surface-color);
  padding: 1.5rem;
  border-radius: 2px;
  border: 1px dashed var(--border-color);
}

.search-box {
  flex: 1 1 100%;
}

.search-box input {
  width: 100%;
  font-size: 0.875rem;
}

.filters {
  display: flex;
  gap: 1rem;
  width: 100%;
}

.filters select {
  flex: 1;
}

@media (min-width: 600px) {
  .task-filter {
    flex-wrap: nowrap;
  }
  .search-box {
    flex: 2;
  }
  .filters {
    flex: 1;
    width: auto;
  }
}
</style>
