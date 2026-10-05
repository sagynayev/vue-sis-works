<template>
  <li class="task" :class="{ completed: task.completed }">
    <div class="task-heading">
      <h3>{{ task.title }}</h3>
      <span class="status">{{ task.completed ? 'done' : 'active' }}</span>
    </div>

    <p class="description">{{ task.description || 'no extra details' }}</p>
    <p class="date">created: {{ formattedDate }}</p>

    <div class="priority-field">
      <label :for="'priority-' + task.id">priority</label>
      <select :id="'priority-' + task.id" :value="task.priority" @change="changePriority">
        <option value="low">low</option>
        <option value="medium">medium</option>
        <option value="high">high</option>
      </select>
    </div>

    <div class="actions">
      <button type="button" @click="$emit('toggle-task', task.id)">
        {{ task.completed ? 'not done yet' : 'mark as done' }}
      </button>
      <button type="button" class="secondary" @click="$emit('edit-task', task)">
        edit
      </button>
      <button type="button" class="danger" @click="$emit('delete-task', task.id)">
        delete
      </button>
    </div>
  </li>
</template>

<script>
export default {
  // the parent gives us the task, we just show it here
  props: {
    task: {
      type: Object,
      required: true
    }
  },

  computed: {
    formattedDate() {
      return new Date(this.task.createdAt).toLocaleString('en-gb');
    }
  },

  methods: {
    changePriority(event) {
      // send the new priority back to the parent
      this.$emit('change-priority', {
        id: this.task.id,
        priority: event.target.value
      });
    }
  }
};
</script>
