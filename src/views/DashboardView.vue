<script setup lang="ts">
import { onMounted } from 'vue'
import { useEntriesStore } from '../store/entriesStore'
import GlucoseChart from '../components/GlucoseChart.vue'
import { ref, computed } from 'vue'

const store = useEntriesStore()

function severityIcon(level: string): string {
  switch (level) {
    case 'bassa': return '🟢'
    case 'media': return '🟠'
    case 'alta': return '🔴'
    default: return '⚪️'
  }
}

onMounted(() => {
  store.loadEntries()
})



const selectedRange = ref<'1w' | '15d' | '1m' | '6m'>('1w')

const filteredEntries = computed(() => {
  const now = new Date()
  const cutoff = {
    '1w': new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000),
    '15d': new Date(now.getTime() - 15 * 24 * 60 * 60 * 1000),
    '1m': new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000),
    '6m': new Date(now.getTime() - 180 * 24 * 60 * 60 * 1000)
  }[selectedRange.value]

  return store.entries
    .filter(entry => new Date(entry.timestamp) >= cutoff)
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
})
</script>

<template>
  <div class="dashboard">
    <h2>📊 Storico Inserimenti</h2>

    <GlucoseChart :entries="store.entries" />

    <h2>🗂️ Ultimi Dati Raccolti</h2>

    <div class="filter-controls">
      <label for="range-select">Intervallo:</label>
      <select id="range-select" v-model="selectedRange">
        <option value="1w">Ultima settimana</option>
        <option value="15d">Ultimi 15 giorni</option>
        <option value="1m">Ultimo mese</option>
        <option value="6m">Ultimi 6 mesi</option>
      </select>
    </div>


    <div v-if="store.entries.length === 0">
      <p>Nessuna entry disponibile.</p>
    </div>

    <ul v-else>
      <li v-for="entry in filteredEntries" :key="entry.entry_id">
        <strong>{{ new Date(entry.timestamp).toLocaleString() }}</strong><br />
        🍽️ Glicemia post: {{ entry.meal.glucose_post }} mg/dL<br />
        🧪 Creatinina: {{ entry.renal.creatinine }} mg/dL<br />
        💧 eGFR: {{ entry.renal.eGFR }}<br />
        🩺 Sintomi: {{ entry.symptoms.join(', ') || 'Nessuno' }}<br />

        <span v-if="entry.agent_feedback">
          <span class="severity-label">🧭 Severita':</span>
          <span :class="['badge', entry.agent_feedback.severity]">
            {{ severityIcon(entry.agent_feedback.severity) }} {{ entry.agent_feedback.severity }}
          </span><br />
          ⚠️ Suggerimento: {{ entry.agent_feedback.suggestion }}<br />
          📌 Regola attivata: {{ entry.agent_feedback.rule_triggered }}
        </span> 
      </li>
    </ul>
  </div>
</template>

<style scoped>
.dashboard {
  padding: 1rem;
}
li {
  margin-bottom: 1rem;
  padding: 0.75rem;
  border-bottom: 1px solid #ccc;
  background-color: #f9f9f9;
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
select {
  padding: 0.4rem 0.8rem;
  font-size: 0.9rem;
  border-radius: 4px;
  background-color: #f0f0f0; /* light neutral tone */
  border: 1px solid #ccc;
  color: #333;
  width: auto;
  min-width: max-content;
  appearance: auto; /* optional: removes native arrow styling */
  cursor: pointer;
}
</style>
