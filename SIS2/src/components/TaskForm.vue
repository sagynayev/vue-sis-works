<template>
  <div class="task-form-container">
    <form @submit.prevent="handleSubmit" class="task-form">
      <h3>{{ isEditing ? 'edit task' : 'add new task (six seven)' }}</h3>
      
      <div class="form-group">
        <input 
          type="text" 
          v-model="formData.title" 
          placeholder="enter task (six seven)..." 
          required 
        />
      </div>
      
      <div class="form-group">
        <textarea 
          v-model="formData.description" 
          placeholder="description (optional)..." 
          rows="3"
        ></textarea>
      </div>
      
      <div class="form-group row">
        <select v-model="formData.priority">
          <option value="low">Low Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="high">High Priority</option>
        </select>
        
        <BaseButton type="submit" variant="primary">
          {{ isEditing ? 'Update' : 'Add Task' }}
        </BaseButton>
        <BaseButton v-if="isEditing" @click="$emit('cancel')" variant="secondary" type="button">
          Cancel
        </BaseButton>
      </div>
    </form>
  </div>
</template>

<script setup>
import { reactive, watch } from 'vue'

const props = defineProps({
  initialData: {
    type: Object,
    default: null
  },
  isEditing: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['submit', 'cancel'])

const formData = reactive({
  title: '',
  description: '',
  priority: 'low'
})

const resetForm = () => {
  formData.title = ''
  formData.description = ''
  formData.priority = 'low'
}

// Watch for initialData changes to populate form when editing
watch(() => props.initialData, (newVal) => {
  if (newVal) {
    formData.title = newVal.title
    formData.description = newVal.description
    formData.priority = newVal.priority
  } else {
    resetForm()
  }
}, { immediate: true })

const handleSubmit = () => {
  emit('submit', { ...formData })
  if (!props.isEditing) {
    resetForm()
  }
}
</script>

<style scoped>
.task-form-container {
  background: var(--surface-color);
  padding: 2rem;
  border-radius: 2px;
  border: 1px dashed var(--border-color);
  margin-bottom: 2rem;
}

.task-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.row {
  flex-direction: row;
  gap: 1rem;
  align-items: center;
}

.row select {
  flex: 1;
}
</style>
