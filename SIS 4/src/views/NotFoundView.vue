<template>
  <a-result status="404" title="page not found" sub-title="this page does not exist.">
    <template #extra><RouterLink to="/"><a-button type="primary">go home</a-button></RouterLink></template>
  </a-result>
</template>
