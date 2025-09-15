<template>
  <section>
    <h3>🧠 Contesto</h3>

      <div class="option-group">
        <h4><span>💊 Farmaci assunti </span></h4>
        <div class="checkbox-grid">
          <label v-for="med in knownMedications" :key="med" class="checkbox-item">
            <input type="checkbox" :value="med" v-model="selectedMedications" />
            {{ med }}
          </label>
        </div>
        <small>Seleziona uno o più farmaci assunti prima della rilevazione.</small>
      </div>

      <div class="option-group">
        <h4><span>🏃 Attività svolta</span></h4>
        <div class="checkbox-grid">
          <label v-for="act in knownActivities" :key="act" class="checkbox-item">
            <input type="checkbox" :value="act" v-model="selectedActivities" />
            {{ act }}
          </label>
        </div>
        <small>Attività fisica o comportamentale rilevante prima della misurazione.</small>
      </div>
        
    <div class="form-group">
      <label for="stressLevel">Livello di stress</label>
      <select id="stressLevel" v-model="localStressLevel">
        <option value="basso">Basso</option>
        <option value="moderato">Moderato</option>
        <option value="alto">Alto</option>
      </select>
      <small>Valutazione soggettiva dello stato emotivo.</small>
    </div>

    <div class="form-group">
      <label for="notes">Note aggiuntive</label>
      <textarea id="notes" v-model="localNotes" rows="3" />
      <small>Osservazioni personali, sintesi del contesto.</small>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

const emit = defineEmits([
  'update:medications',
  'update:activities',
  'update:stressLevel',
  'update:notes'
])

const props = defineProps<{
  medications: string[]
  activities: string[]
  stressLevel: 'basso' | 'moderato' | 'alto'
  notes: string
}>()

const knownMedications = [
  'Metformina',
  'Ramipril',
  'Insulina',
  'Aspirina',
  'Lisinopril'
]

const knownActivities = [
  'Passeggiata',
  'Allenamento leggero',
  'Yoga',
  'Lavoro manuale',
  'Riposo'
]



const selectedMedications = ref<string[]>(props.medications)
const selectedActivities = ref<string[]>(props.activities)
const localStressLevel = ref(props.stressLevel)
const localNotes = ref(props.notes)

watch(selectedMedications, val => emit('update:medications', val))
watch(selectedActivities, val => emit('update:activities', val))
watch(localStressLevel, val => emit('update:stressLevel', val))
watch(localNotes, val => emit('update:notes', val))
</script>

