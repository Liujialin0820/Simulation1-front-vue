<script setup>
import Parameters from "./components/parametersTable/ParametersTable.vue";
import { ref } from "vue";

const loading = ref(false);
</script>

<template>
  <div v-loading="loading">
    <Parameters v-model="loading"></Parameters>
  </div>
</template>

<style scoped></style>
