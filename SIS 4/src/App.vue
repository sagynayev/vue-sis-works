<template>
  <a-layout class="site-layout">
    <a-layout-header class="site-header">
      <div class="header-inner">
        <RouterLink class="brand" to="/">sis 4 · student dashboard</RouterLink>
        <nav>
          <RouterLink to="/">dashboard</RouterLink>
          <RouterLink to="/students">students</RouterLink>
          <RouterLink to="/tasks">tasks</RouterLink>
        </nav>
      </div>
    </a-layout-header>
    <a-layout-content class="page-content">
      <RouterView />
    </a-layout-content>
    <a-layout-footer class="site-footer">sis 4 · vue + ant design vue</a-layout-footer>
  </a-layout>
</template>
