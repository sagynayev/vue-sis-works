<template>
  <RouterLink class="back-link" to="/students">← back to students</RouterLink>
  <DataState :loading="loading" :error="error" @retry="load">
    <a-card v-if="student && student.id" :title="student.name">
      <a-descriptions :column="1" bordered>
        <a-descriptions-item label="username">{{ student.username }}</a-descriptions-item>
        <a-descriptions-item label="email">{{ student.email }}</a-descriptions-item>
        <a-descriptions-item label="phone">{{ student.phone }}</a-descriptions-item>
        <a-descriptions-item label="city">{{ student.address?.city }}</a-descriptions-item>
        <a-descriptions-item label="website">{{ student.website }}</a-descriptions-item>
      </a-descriptions>
      <RouterLink class="detail-link" :to="{ path: '/tasks', query: { student: student.id } }">see this student's tasks →</RouterLink>
    </a-card>
    <a-result v-else status="404" title="student not found" sub-title="there is no student with this id.">
      <template #extra><RouterLink to="/students"><a-button type="primary">all students</a-button></RouterLink></template>
    </a-result>
  </DataState>
</template>

<script>
import DataState from '../components/DataState.vue';
import { getStudent } from '../api';

export default {
  components: { DataState },
  props: { id: String },
  data() {
    return { student: null, loading: true, error: '' };
  },
  mounted() {
    this.load();
  },
  watch: {
    id() {
      this.load();
    }
  },
  methods: {
    async load() {
      this.loading = true;
      this.error = '';
      try {
        this.student = await getStudent(this.id);
      } catch (error) {
        if (error.response?.status === 404) {
          this.student = null;
        } else {
          this.error = 'could not load this student. please try again.';
        }
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>
