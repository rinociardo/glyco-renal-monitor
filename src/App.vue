<template>
  <div class="app">
    <header>
      <h1>🧠 GlycoRenal Dashboard</h1>
      <nav>
        <RouterLink to="/dashboard">📊 Dashboard</RouterLink>
        <RouterLink to="/audit-log">📜 Audit Log</RouterLink>
        <RouterLink to="/new-entry">➕ New Entry</RouterLink>
      </nav>
    </header>

    <main>
      <RouterView />
    </main>
  </div>
</template>

<script setup lang="ts">
// No script logic needed here—routing handles view injection
</script>

<style scoped>
.app {
  font-family: 'Segoe UI', sans-serif;
  padding: 1rem;
  background-color: #f5f7fa;
  min-height: 100vh;
}

header {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 2rem;
}

nav {
  display: flex;
  gap: 1rem;
  margin-top: 0.5rem;
}

nav a {
  text-decoration: none;
  color: #007acc;
  font-weight: bold;
}

nav a.router-link-exact-active {
  color: #005999;
  border-bottom: 2px solid #005999;
}
</style>
