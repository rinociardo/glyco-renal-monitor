<script setup lang="ts">
import { ref } from 'vue'
import { useEntriesStore } from '../store/entriesStore'
import { useRouter } from 'vue-router'
import type { Entry } from '../types/Entry'
import { evaluateEntry } from '../services/agentLogic'

import MealSection from './MealSection.vue'
import RenalSection from './RenalSection.vue'
import SymptomsSection from './SymptomsSection.vue'
import ContextSection from './ContextSection.vue'

const store = useEntriesStore()
const router = useRouter()

const timestamp = ref(new Date().toISOString())
const glucosePost = ref<number | null>(null)
const creatinine = ref<number | null>(null)
const eGFR = ref<number | null>(null)
const symptoms = ref<string[]>([])
const notes = ref('')
const carbs = ref<number | null>(null)
const glucosePre = ref<number | null>(null)
const insulinDose = ref<number | null>(null)

const medications = ref<string[]>([])
const activities = ref<string[]>([])
const stressLevel = ref<'basso' | 'moderato' | 'alto'>('moderato')

const availableSymptoms = ['nausea', 'fatigue', 'polyuria', 'blurred vision']

function submitEntry() {
  const newEntry: Entry = {
    entry_id: crypto.randomUUID(),
    timestamp: timestamp.value,
    meal: {
      carbs: carbs.value ?? 0,
      glucose_pre: glucosePre.value ?? 0,
      glucose_post: glucosePost.value ?? 0,
      insulin_dose: insulinDose.value ?? 0
    },
    renal: {
      creatinine: creatinine.value ?? 0,
      eGFR: eGFR.value ?? 0
    },
    symptoms: symptoms.value,
    context_notes: {
      medications: medications.value,
      activities: activities.value,
      stress_level: stressLevel.value,
      additional_notes: notes.value
    },
    agent_feedback: null
  }
  // DEBUG console.log('Saving entry:', JSON.parse(JSON.stringify(newEntry)))
  const evaluated = evaluateEntry(newEntry)
  store.addEntry(evaluated)
  resetForm()
  router.push('/dashboard')
}

function resetForm() {
  glucosePost.value = null
  creatinine.value = null
  eGFR.value = null
  symptoms.value = []
  notes.value = ''
  carbs.value = null
  glucosePre.value = null
  insulinDose.value = null
  medications.value = []
  activities.value = []
  stressLevel.value = 'moderato'
}

</script>

<template>
  <div class="new-entry">
    <h2>📝 Nuovo Inserimento</h2>

    
    <MealSection
      v-model:carbs="carbs"
      v-model:glucosePre="glucosePre"
      v-model:glucosePost="glucosePost"
      v-model:insulinDose="insulinDose"
    />
    
    <RenalSection
      v-model:creatinina="creatinine"
      v-model:eGFR="eGFR"
    />
    
    <SymptomsSection
      v-model:symptoms="symptoms"
      :availableSymptoms="availableSymptoms"
    />
    
    <ContextSection
      v-model:medications="medications"
      v-model:activities="activities"
      v-model:stressLevel="stressLevel"
      v-model:notes="notes"
    />

    <button class="btn-save" @click="submitEntry">SALVA</button>
    
    <button class="btn-cancel" @click="resetForm">ANNULLA</button>
  </div>
</template>

<style scoped>
.entry-form {
  padding: 1rem;
  background-color: #fefefe;
  border-radius: 8px;
  max-width: 600px;
  margin: auto;
}
form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
input, textarea {
  padding: 0.5rem;
  font-size: 1rem;
}
button {
  padding: 0.75rem;
  background-color: #007acc;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.symptom-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}
</style>
