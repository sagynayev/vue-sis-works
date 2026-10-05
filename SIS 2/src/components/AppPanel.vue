<template>
  <section class="panel">
    <h2>{{ title }}</h2>
    <!-- the stuff inside the panel goes here -->
    <slot></slot>
  </section>
</template>

<script>
export default {
  props: {
    title: String
  }
};
</script>
