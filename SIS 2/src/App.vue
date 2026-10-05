<template>
  <main class="container">
    <header>
      <p class="subtitle">sis 2 · task manager</p>
      <h1>my tasks</h1>
      <p>stuff to do. preferably before the deadline.</p>
    </header>

    <p v-if="storageMessage" class="error" role="alert">{{ storageMessage }}</p>

    <AppPanel title="the numbers">
      <div class="statistics" aria-live="polite">
        <p>total <strong>{{ tasks.length }}</strong></p>
        <p>active <strong>{{ activeCount }}</strong></p>
        <p>done <strong>{{ completedCount }}</strong></p>
      </div>
    </AppPanel>

    <AppPanel :title="editingId === null ? 'add a task' : 'edit this task'">
      <form @submit.prevent="saveTask">
        <label for="task-title">title</label>
        <input id="task-title" ref="titleInput" v-model="title" maxlength="120"
          placeholder="like, finally learn vue" required>

        <label for="task-description">description</label>
        <textarea id="task-description" v-model="description" rows="3"
          placeholder="what needs doing?"></textarea>

        <label for="task-priority">priority</label>
        <select id="task-priority" v-model="priority">
          <option value="low">low</option>
          <option value="medium">medium</option>
          <option value="high">high</option>
        </select>

        <p v-if="formError" class="error" role="alert">{{ formError }}</p>
        <div class="actions">
          <button type="submit">{{ editingId === null ? 'add task' : 'save changes' }}</button>
          <button v-if="editingId !== null" type="button" class="secondary" @click="resetForm">
            cancel
          </button>
        </div>
      </form>
    </AppPanel>

    <AppPanel title="the todo list">
      <div class="filters">
        <div>
          <label for="search">search by title</label>
          <input id="search" v-model="search" type="search" placeholder="where was that task...">
        </div>
        <div>
          <label for="status-filter">status</label>
          <select id="status-filter" v-model="statusFilter">
            <option value="all">all</option>
            <option value="active">active</option>
            <option value="completed">done</option>
          </select>
        </div>
        <div>
          <label for="priority-filter">priority</label>
          <select id="priority-filter" v-model="priorityFilter">
            <option value="all">all</option>
            <option value="low">low</option>
            <option value="medium">medium</option>
            <option value="high">high</option>
          </select>
        </div>
      </div>

      <p v-if="tasks.length === 0" class="empty">nothing here yet. add a task above and call it a productive start.</p>
      <p v-else-if="filteredTasks.length === 0" class="empty">no matches. try another search or change the filters.</p>
      <ul v-else class="task-list">
        <TaskItem v-for="task in filteredTasks" :key="task.id" :task="task"
          @toggle-task="toggleTask" @edit-task="editTask"
          @delete-task="deleteTask" @change-priority="changePriority" />
      </ul>
    </AppPanel>
  </main>
</template>

<script>
import TaskItem from './components/TaskItem.vue';

export default {
  components: { TaskItem },

  data() {
    return {
      tasks: [],
      nextId: 1,
      title: '',
      description: '',
      priority: 'medium',
      editingId: null,
      search: '',
      statusFilter: 'all',
      priorityFilter: 'all',
      formError: '',
      storageMessage: ''
    };
  },

  computed: {
    filteredTasks() {
      let result = [];
      let searchText = this.search.trim().toLowerCase();

      for (let i = 0; i < this.tasks.length; i++) {
        let task = this.tasks[i];
        let matchesTitle = task.title.toLowerCase().includes(searchText);
        let matchesPriority = this.priorityFilter === 'all' || task.priority === this.priorityFilter;
        let matchesStatus = this.statusFilter === 'all' ||
          (this.statusFilter === 'active' && !task.completed) ||
          (this.statusFilter === 'completed' && task.completed);

        if (matchesTitle && matchesPriority && matchesStatus) {
          result.push(task);
        }
      }
      return result;
    },

    completedCount() {
      let count = 0;
      for (let i = 0; i < this.tasks.length; i++) {
        if (this.tasks[i].completed) {
          count++;
        }
      }
      return count;
    },

    activeCount() {
      return this.tasks.length - this.completedCount;
    }
  },

  watch: {
    // save when a task changes, even if it's just the priority
    tasks: {
      deep: true,
      handler() {
        try {
          localStorage.setItem('sis2-tasks', JSON.stringify(this.tasks));
          this.storageMessage = '';
        } catch (error) {
          this.storageMessage = 'could not save your tasks. refreshing might lose the latest changes.';
        }
      }
    }
  },

  // get the tasks back when the app starts
  created() {
    try {
      let saved = localStorage.getItem('sis2-tasks');
      if (saved) {
        let savedTasks = JSON.parse(saved);
        if (!Array.isArray(savedTasks)) {
          throw new Error('saved tasks should be an array');
        }
        this.tasks = savedTasks;
        for (let i = 0; i < this.tasks.length; i++) {
          if (this.tasks[i].id >= this.nextId) {
            this.nextId = this.tasks[i].id + 1;
          }
        }
      }
    } catch (error) {
      this.storageMessage = 'could not load your saved tasks.';
    }
  },

  // the input is ready now, so put the cursor there
  mounted() {
    this.$refs.titleInput.focus();
  },

  methods: {
    saveTask() {
      let cleanTitle = this.title.trim();
      if (cleanTitle === '') {
        this.formError = 'give your task a name. spaces alone do not count.';
        return;
      }

      if (this.editingId === null) {
        this.tasks.push({
          id: this.nextId,
          title: cleanTitle,
          description: this.description.trim(),
          createdAt: new Date().toISOString(),
          completed: false,
          priority: this.priority
        });
        this.nextId++;
      } else {
        for (let i = 0; i < this.tasks.length; i++) {
          if (this.tasks[i].id === this.editingId) {
            this.tasks[i].title = cleanTitle;
            this.tasks[i].description = this.description.trim();
            this.tasks[i].priority = this.priority;
            break;
          }
        }
      }
      this.resetForm();
    },

    editTask(task) {
      // edit a copy in the form so cancel doesn't change the task
      this.editingId = task.id;
      this.title = task.title;
      this.description = task.description;
      this.priority = task.priority;
      this.formError = '';
      this.$refs.titleInput.focus();
    },

    resetForm() {
      this.editingId = null;
      this.title = '';
      this.description = '';
      this.priority = 'medium';
      this.formError = '';
    },

    toggleTask(id) {
      for (let i = 0; i < this.tasks.length; i++) {
        if (this.tasks[i].id === id) {
          this.tasks[i].completed = !this.tasks[i].completed;
          break;
        }
      }
    },

    deleteTask(id) {
      for (let i = 0; i < this.tasks.length; i++) {
        if (this.tasks[i].id === id) {
          this.tasks.splice(i, 1);
          break;
        }
      }
      if (this.editingId === id) {
        this.resetForm();
      }
    },

    changePriority(data) {
      for (let i = 0; i < this.tasks.length; i++) {
        if (this.tasks[i].id === data.id) {
          this.tasks[i].priority = data.priority;
          break;
        }
      }
      if (this.editingId === data.id) {
        this.priority = data.priority;
      }
    }
  }
};
</script>
