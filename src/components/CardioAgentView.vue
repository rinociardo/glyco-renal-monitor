<script lang="ts" setup>
import { CardioAgent } from '../agents/CardioAgent'
import { input } from '../data/mockMetrics' // named import since mockMetrics.ts uses named export

const agent = new CardioAgent(input)
const output = agent.evaluate()
</script>

<template>
  <section>
    <h2>CardioAgent Output</h2>
    <p>Status: {{ output.status }}</p>

    <h3>Insights</h3>
    <ul>
      <li v-for="(insight, index) in output.insights" :key="'insight-' + index">
        {{ insight }}
      </li>
    </ul>

    <h3>Recommendations</h3>
    <ul>
      <li v-for="(rec, index) in output.recommendations" :key="'rec-' + index">
        {{ rec }}
      </li>
    </ul>

    <h3>Explanation</h3>
    <p>{{ output.explanation }}</p>
  </section>
</template>

<style scoped>
section {
  padding: 1rem;
  background-color: #f9f9f9;
  border-radius: 8px;
}

h2 {
  margin-bottom: 0.5rem;
}

h3 {
  margin-top: 1rem;
  margin-bottom: 0.25rem;
}

ul {
  list-style-type: disc;
  padding-left: 1.5rem;
}
</style>
