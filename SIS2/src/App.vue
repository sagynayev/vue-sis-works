<template>
  <div class="app-container">
    <h1>nurdos task manager</h1>
    
    <TaskStats 
      :total="totalTasks" 
      :active="activeTasks" 
      :completed="completedTasks" 
    />
    
    <TaskFilter 
      v-model:searchQuery="searchQuery"
      v-model:filterStatus="filterStatus"
      v-model:filterPriority="filterPriority"
    />
    
    <TaskForm 
      :isEditing="isEditing"
      :initialData="taskToEdit"
      @submit="handleTaskSubmit"
      @cancel="cancelEdit"
    />
    
    <div class="tasks-list">
      <h2 v-if="filteredTasks.length === 0">no tasks found.</h2>
      <transition-group name="list">
        <TaskItem 
          v-for="task in filteredTasks" 
          :key="task.id" 
          :task="task"
          @toggle-status="toggleTaskStatus(task.id)"
          @edit="startEdit(task)"
          @delete="deleteTask(task.id)"
        >
          <!-- Using the slot from TaskItem -->
          <template #extra-badges v-if="task.title.toLowerCase().includes('nurdos')">
            <span class="badge" style="background: #333; color: #0f0;">nurdos special</span>
          </template>
        </TaskItem>
      </transition-group>
    </div>
    
    <div class="footer">
      powered by six seven
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUpdated } from 'vue'
import TaskStats from './components/TaskStats.vue'
import TaskFilter from './components/TaskFilter.vue'
import TaskForm from './components/TaskForm.vue'
import TaskItem from './components/TaskItem.vue'

// State
const tasks = ref([])
const searchQuery = ref('')
const filterStatus = ref('all')
const filterPriority = ref('all')

const isEditing = ref(false)
const taskToEdit = ref(null)

// Lifecycle hook 1: onMounted
onMounted(() => {
  const savedTasks = localStorage.getItem('nurdos-tasks')
  if (savedTasks) {
    tasks.value = JSON.parse(savedTasks)
  }
})

// Lifecycle hook 2: onUpdated
onUpdated(() => {
  console.log('App state updated! Re-rendering DOM.')
})

// Watcher to save to localStorage
watch(tasks, (newTasks) => {
  localStorage.setItem('nurdos-tasks', JSON.stringify(newTasks))
}, { deep: true })

// Computed properties for Stats
const totalTasks = computed(() => tasks.value.length)
const activeTasks = computed(() => tasks.value.filter(t => t.status === 'active').length)
const completedTasks = computed(() => tasks.value.filter(t => t.status === 'completed').length)

// Computed property for filtering and searching
const filteredTasks = computed(() => {
  return tasks.value.filter(task => {
    // Search
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.value.toLowerCase())
    
    // Status filter
    const matchesStatus = filterStatus.value === 'all' || task.status === filterStatus.value
    
    // Priority filter
    const matchesPriority = filterPriority.value === 'all' || task.priority === filterPriority.value
    
    return matchesSearch && matchesStatus && matchesPriority
  }).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) // Sort newest first
})

// Methods
const handleTaskSubmit = (taskData) => {
  if (isEditing.value && taskToEdit.value) {
    // Update existing
    const index = tasks.value.findIndex(t => t.id === taskToEdit.value.id)
    if (index !== -1) {
      tasks.value[index] = {
        ...tasks.value[index],
        title: taskData.title,
        description: taskData.description,
        priority: taskData.priority
      }
    }
    cancelEdit()
  } else {
    // Add new
    const newTask = {
      id: Date.now().toString(),
      title: taskData.title,
      description: taskData.description,
      priority: taskData.priority,
      status: 'active',
      createdAt: new Date().toISOString()
    }
    tasks.value.unshift(newTask)
  }
}

const toggleTaskStatus = (id) => {
  const task = tasks.value.find(t => t.id === id)
  if (task) {
    task.status = task.status === 'active' ? 'completed' : 'active'
  }
}

const deleteTask = (id) => {
  if (confirm('Are you sure you want to delete this task?')) {
    tasks.value = tasks.value.filter(t => t.id !== id)
  }
}

const startEdit = (task) => {
  isEditing.value = true
  taskToEdit.value = { ...task }
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const cancelEdit = () => {
  isEditing.value = false
  taskToEdit.value = null
}
</script>

<style scoped>
.app-container {
  display: flex;
  flex-direction: column;
}

.tasks-list {
  display: flex;
  flex-direction: column;
}

/* Vue Transition for list items */
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px) scale(0.9);
}
.list-leave-active {
  position: absolute; /* Allows smooth removal */
}

.footer {
  text-align: center;
  margin-top: 2rem;
  font-size: 0.8rem;
  color: var(--text-muted);
  border-top: 1px dashed var(--border-color);
  padding-top: 1rem;
}
</style>
