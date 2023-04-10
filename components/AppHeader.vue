<style scoped>
  .app-header {
    padding: 15px 0;
    margin-bottom: 30px;
    background-color: #fff;
    border-bottom: 1px solid var(--color-border);
  }

  .nav-link:not(:hover) {
    text-decoration: none;
  }
</style>

<template>
  <header class="app-header">
    <div class="container">
      <nav>
        <NuxtLink to="/" class="nav-link">Home</NuxtLink>
      </nav>
    </div>
  </header>
</template>
