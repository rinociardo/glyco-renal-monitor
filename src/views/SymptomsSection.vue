<template>
  <section>
    <h3>🩺 Sintomi</h3>

    <div class="form-group">
      <label for="symptoms">Sintomi osservati</label>
      <select id="symptoms" v-model="localSymptoms" multiple>
        <option
          v-for="symptom in availableSymptoms"
          :key="symptom"
          :value="symptom"
        >
          {{ formatSymptom(symptom) }}
        </option>
      </select>
      <small>Seleziona uno o più sintomi presenti al momento dell'inserimento.</small>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps<{
  symptoms: string[]
  availableSymptoms: string[]
}>()

const emit = defineEmits(['update:symptoms'])

const localSymptoms = ref([...props.symptoms])
watch(localSymptoms, val => emit('update:symptoms', val))

function formatSymptom(symptom: string): string {
  const map: Record<string, string> = {
    nausea: 'Nausea',
    fatigue: 'Affaticamento',
    polyuria: 'Minzione frequente',
    'blurred vision': 'Visione offuscata'
  }
  return map[symptom] || symptom
}
</script>
