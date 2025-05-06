<template>
  <div v-if="visible" class="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999]">
    <ProgressSpinner style="width: 50px; height: 50px" />
  </div>
</template>

<script setup>
import ProgressSpinner from 'primevue/progressspinner'
// eslint-disable-next-line
const visible = defineModel()
</script>
