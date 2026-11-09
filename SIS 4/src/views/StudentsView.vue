<template>
  <div class="page-heading"><div><p class="eyebrow">people</p><h1>students</h1><p>find a student and open their page.</p></div></div>
  <DataState :loading="loading" :error="error" @retry="load">
    <a-input v-model:value="search" placeholder="search by name or email" class="search-box" allow-clear />
    <a-card>
      <a-list :data-source="filteredStudents">
        <template #renderItem="{ item }">
          <a-list-item>
            <RouterLink :to="'/students/' + item.id">{{ item.name }}</RouterLink>
            <span class="muted">{{ item.email }}</span>
          </a-list-item>
        </template>
      </a-list>
      <a-empty v-if="filteredStudents.length === 0" description="no students found" />
    </a-card>
  </DataState>
</template>

<script>
import DataState from '../components/DataState.vue';
import { getStudents } from '../api';

export default {
  components: { DataState },
  data() {
    return { students: [], search: '', loading: true, error: '' };
  },
  computed: {
    filteredStudents() {
      const text = this.search.trim().toLowerCase();
      return this.students.filter(student => (student.name + ' ' + student.email).toLowerCase().includes(text));
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
        this.students = await getStudents();
      } catch {
        this.error = 'could not load students. please try again.';
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>
