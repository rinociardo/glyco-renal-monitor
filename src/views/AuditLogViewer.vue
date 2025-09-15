<script setup lang="ts">
import { onMounted, computed, ref } from 'vue'
import { useEntriesStore } from '../store/entriesStore'
import type { Entry } from '../types/Entry'

const store = useEntriesStore()

const severityFilter = ref<'tutti' | 'bassa' | 'media' | 'alta'>('tutti')
const selectedRange = ref<'1w' | '15d' | '1m' | '6m'>('1w')
const selectedCount = ref<number>(10)

onMounted(() => {
  store.loadEntries()
})

const filteredEntries = computed(() => {
  const now = new Date()
  const cutoff = {
    '1w': new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000),
    '15d': new Date(now.getTime() - 15 * 24 * 60 * 60 * 1000),
    '1m': new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000),
    '6m': new Date(now.getTime() - 180 * 24 * 60 * 60 * 1000)
  }[selectedRange.value]

  return store.entries
    .filter((e: Entry) => {
      if (!e.agent_feedback) return false
      if (new Date(e.timestamp) < cutoff) return false
      if (severityFilter.value === 'tutti') return true
      return e.agent_feedback.severity === severityFilter.value
    })
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    .slice(0, selectedCount.value)
})
</script>

<template>
  <div class="audit-log">
    <h2>🧠 Registro Suggerimenti Agente</h2>

    <div class="controls">
      <label for="severity">Severità:</label>
      <select id="severity" v-model="severityFilter">
        <option value="tutti">Tutti</option>
        <option value="bassa">Bassa</option>
        <option value="media">Media</option>
        <option value="alta">Alta</option>
      </select>

      <label for="range">Intervallo:</label>
      <select id="range" v-model="selectedRange">
        <option value="1w">Ultima settimana</option>
        <option value="15d">Ultimi 15 giorni</option>
        <option value="1m">Ultimo mese</option>
        <option value="6m">Ultimi 6 mesi</option>
      </select>

      <label for="count">Numero voci:</label>
      <select id="count" v-model="selectedCount">
        <option :value="6">6</option>
        <option :value="10">10</option>
        <option :value="20">20</option>
      </select>
    </div>

    <ul v-if="filteredEntries.length > 0">
      <li v-for="entry in filteredEntries" :key="entry.entry_id">
        <strong>{{ new Date(entry.timestamp).toLocaleString() }}</strong><br />
        ⚠️ <em>{{ entry.agent_feedback?.suggestion }}</em><br />
        🔍 Regola: {{ entry.agent_feedback?.rule_triggered }}<br />
        🧭 Severità: 
        <span :class="['badge', entry.agent_feedback?.severity]">
          {{ entry.agent_feedback?.severity }}
        </span>
      </li>
    </ul>

    <p v-else>Nessun suggerimento trovato per il filtro selezionato.</p>
  </div>
</template>

<style scoped>
.audit-log {
  padding: 1rem;
}
.controls {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  margin-bottom: 1rem;
  align-items: center;
}

.controls label {
  font-weight: bold;
  margin-right: 0.4rem;
}

.controls select {
  padding: 0.4rem 0.6rem;
  font-size: 0.9rem;
  border-radius: 4px;
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  color: #333;
  cursor: pointer;
  width: auto;
  min-width: max-content;
  max-width: 14rem; /* prevents full-row stretching */
  appearance: auto;
}
li {
  margin-bottom: 1rem;
  padding: 0.75rem;
  border-bottom: 1px solid #ccc;
  background-color: #fffdf7;
  border-radius: 6px;
}
.badge {
  display: inline-block;
  margin-top: 0.25rem;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-weight: bold;
  text-transform: uppercase;
}
.badge.bassa {
  background-color: #d4edda;
  color: #155724;
}
.badge.media {
  background-color: #fff3cd;
  color: #856404;
}
.badge.alta {
  background-color: #f8d7da;
  color: #721c24;
}
@media (max-width: 600px) {
  .controls {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.75rem;
  }

  .controls label {
    margin-bottom: 0.25rem;
  }

  .controls select {
    width: 100%;
    max-width: none;
  }
}
</style>
