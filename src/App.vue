<template>
  <div class="app">
    <header>
      <h1>🧠 Dashboard per il Monitoraggio Dati di Glicemia e Funzione Renale</h1>
      <nav>
        <RouterLink to="/dashboard">📊 Storico dati Immessi</RouterLink>
        <RouterLink to="/audit-log">📜 Registro Diagnostica</RouterLink>
        <RouterLink to="/new-entry">➕ Immissione Nuovi Dati</RouterLink>
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
