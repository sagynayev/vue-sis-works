<template>
  <div class="page-heading">
    <div><p class="eyebrow">overview</p><h1>student dashboard</h1><p>students and their tasks in one place.</p></div>
  </div>
  <DataState :loading="loading" :error="error" @retry="load">
    <div class="stats-grid">
      <a-card><a-statistic title="students" :value="students.length" /></a-card>
      <a-card><a-statistic title="all tasks" :value="tasks.length" /></a-card>
      <a-card><a-statistic title="done tasks" :value="doneCount" /></a-card>
    </div>
    <a-card title="task progress" class="section-card">
      <a-progress :percent="progress" />
    </a-card>
    <a-card title="students" class="section-card">
      <a-list :data-source="students.slice(0, 5)">
        <template #renderItem="{ item }">
          <a-list-item>
            <RouterLink :to="'/students/' + item.id">{{ item.name }}</RouterLink>
            <span class="muted">{{ item.email }}</span>
          </a-list-item>
        </template>
      </a-list>
      <RouterLink to="/students">see all students →</RouterLink>
    </a-card>
  </DataState>
</template>

<script>
import DataState from '../components/DataState.vue';
import { getStudents, getTasks } from '../api';

export default {
  components: { DataState },
  data() {
    return { students: [], tasks: [], loading: true, error: '' };
  },
  computed: {
    doneCount() {
      return this.tasks.filter(task => task.completed).length;
    },
    progress() {
      return this.tasks.length ? Math.round(this.doneCount / this.tasks.length * 100) : 0;
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
        const [students, tasks] = await Promise.all([getStudents(), getTasks()]);
        this.students = students;
        this.tasks = tasks;
      } catch {
        this.error = 'could not load the dashboard. please try again.';
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>
