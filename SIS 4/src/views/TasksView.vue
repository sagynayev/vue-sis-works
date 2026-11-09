<template>
  <div class="page-heading"><div><p class="eyebrow">work</p><h1>tasks</h1><p>check what is done and what is still open.</p></div></div>
  <DataState :loading="loading" :error="error" @retry="load">
    <div class="filters">
      <a-select v-model:value="status" class="filter-select">
        <a-select-option value="all">all tasks</a-select-option>
        <a-select-option value="done">done</a-select-option>
        <a-select-option value="open">open</a-select-option>
      </a-select>
      <a-select v-model:value="studentId" class="filter-select">
        <a-select-option value="all">all students</a-select-option>
        <a-select-option v-for="student in students" :key="student.id" :value="student.id">{{ student.name }}</a-select-option>
      </a-select>
    </div>
    <a-card>
      <p class="muted">{{ filteredTasks.length }} tasks</p>
      <a-list :data-source="filteredTasks.slice(0, 30)">
        <template #renderItem="{ item }">
          <a-list-item>
            <span>{{ item.title }}</span>
            <a-tag :color="item.completed ? 'green' : 'orange'">{{ item.completed ? 'done' : 'open' }}</a-tag>
          </a-list-item>
        </template>
      </a-list>
      <a-empty v-if="filteredTasks.length === 0" description="no tasks found" />
      <p v-else-if="filteredTasks.length > 30" class="muted">showing first 30 tasks</p>
    </a-card>
  </DataState>
</template>

<script>
import DataState from '../components/DataState.vue';
import { getStudents, getTasks } from '../api';

export default {
  components: { DataState },
  data() {
    return { tasks: [], students: [], status: 'all', studentId: this.$route.query.student ? Number(this.$route.query.student) : 'all', loading: true, error: '' };
  },
  computed: {
    filteredTasks() {
      return this.tasks.filter(task => {
        const matchesStatus = this.status === 'all' || (this.status === 'done' ? task.completed : !task.completed);
        const matchesStudent = this.studentId === 'all' || task.userId === this.studentId;
        return matchesStatus && matchesStudent;
      });
    }
  },
  mounted() {
    this.load();
  },
  methods: {
    async load() {
      this.loading = true;
      this.error = '';
      try {
        const [tasks, students] = await Promise.all([getTasks(), getStudents()]);
        this.tasks = tasks;
        this.students = students;
      } catch {
        this.error = 'could not load tasks. please try again.';
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>
