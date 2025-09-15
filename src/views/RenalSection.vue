<template>
  <section>
    <h3>🧪 Parametri renali</h3>

    <div class="form-group">
      <label for="creatinina">Creatinina (mg/dL)</label>
      <input id="creatinina" type="number" v-model="localCreatinina" />
      <small>Valore sierico della creatinina, indicativo della funzione renale.</small>
    </div>

    <div class="form-group">
      <label for="eGFR">eGFR (ml/min/1.73m²)</label>
      <input id="eGFR" type="number" v-model="localEGFR" />
      <small>Stima della velocità di filtrazione glomerulare.</small>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps<{
  creatinina: number | null
  eGFR: number | null
}>()

const emit = defineEmits(['update:creatinina', 'update:eGFR'])

const localCreatinina = ref(props.creatinina)
const localEGFR = ref(props.eGFR)

watch(localCreatinina, val => emit('update:creatinina', val))
watch(localEGFR, val => emit('update:eGFR', val))
</script>
