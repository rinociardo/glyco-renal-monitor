<template>
  <section>
    <h3>🍽️ Dati del pasto</h3>

    <div class="form-group">
      <label for="carbs">Carboidrati (g)</label>
      <input id="carbs" type="number" v-model="localCarbs" />
      <small>Quantità stimata di carboidrati consumati nel pasto.</small>
    </div>

    <div class="form-group">
      <label for="glucosePre">Glicemia pre-pasto (mg/dL)</label>
      <input id="glucosePre" type="number" v-model="localGlucosePre" />
      <small>Misurata prima di iniziare a mangiare.</small>
    </div>

    <div class="form-group">
      <label for="glucosePost">Glicemia post-pasto (mg/dL)</label>
      <input id="glucosePost" type="number" v-model="localGlucosePost" />
      <small>Misurata circa 2 ore dopo il pasto.</small>
    </div>

    <div class="form-group">
      <label for="insulinDose">Dose di insulina (unità)</label>
      <input id="insulinDose" type="number" v-model="localInsulinDose" />
      <small>Unità somministrate in relazione al pasto.</small>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps<{
  carbs: number | null
  glucosePre: number | null
  glucosePost: number | null
  insulinDose: number | null
}>()

const emit = defineEmits([
  'update:carbs',
  'update:glucosePre',
  'update:glucosePost',
  'update:insulinDose'
])

const localCarbs = ref(props.carbs)
const localGlucosePre = ref(props.glucosePre)
const localGlucosePost = ref(props.glucosePost)
const localInsulinDose = ref(props.insulinDose)

watch(localCarbs, val => emit('update:carbs', val))
watch(localGlucosePre, val => emit('update:glucosePre', val))
watch(localGlucosePost, val => emit('update:glucosePost', val))
watch(localInsulinDose, val => emit('update:insulinDose', val))
</script>
