<script setup lang="ts">
import { ref, computed } from 'vue'
import { Line } from 'vue-chartjs'
import type { Entry } from '../types/Entry'

import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, LineElement, PointElement, CategoryScale, LinearScale)

const props = defineProps<{ entries: Entry[] }>()

const selectedRange = ref<'1d' | '1w' | '1m'>('1w')

function filterByRange(range: '1d' | '1w' | '1m') {
  selectedRange.value = range
}

const filteredEntries = computed(() => {
  const now = new Date()
  const cutoff = {
    '1d': new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000),
    '1w': new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000),
    '1m': new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
  }[selectedRange.value]

  return props.entries
    .filter(entry => new Date(entry.timestamp) >= cutoff)
    .sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime())
})

const chartData = computed(() => {
  const labels = filteredEntries.value.map(e => new Date(e.timestamp).toLocaleDateString())
  const glucose = filteredEntries.value.map(e => e.meal.glucose_post)

  return {
    labels,
    datasets: [
      {
        label: 'Glicemia post-prandiale',
        data: glucose,
        borderColor: '#f87979',
        fill: false
      }
    ]
  }
})

const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const
    },
    title: {
      display: true,
      text: 'Trend glicemico'
    }
  }
}
</script>

<template>
  <div class="chart-container">
    <div class="range-buttons">
      <button @click="filterByRange('1d')" :class="{ active: selectedRange === '1d' }">1 Day</button>
      <button @click="filterByRange('1w')" :class="{ active: selectedRange === '1w' }">1 Week</button>
      <button @click="filterByRange('1m')" :class="{ active: selectedRange === '1m' }">1 Month</button>
    </div>

    <Line :data="chartData" :options="chartOptions" />
  </div>
</template>

<style scoped>
.chart-container {
  margin-bottom: 2rem;
}
.range-buttons {
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
  margin-bottom: 1rem;
}
.range-buttons button {
  padding: 0.4rem 0.8rem;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
  background-color: #eee;
  border: none;
}
.range-buttons button.active {
  background-color: #007acc;
  color: white;
}
</style>
