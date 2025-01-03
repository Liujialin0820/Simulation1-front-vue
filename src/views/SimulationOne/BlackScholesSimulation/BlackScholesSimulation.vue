<script setup>
import { ref } from "vue";
import ParametersTable from "./components/parametersTable/ParametersTable.vue";

const loading = ref(false);
</script>

<template>
  <div v-loading="loading">
    <ParametersTable v-model="loading"></ParametersTable>
  </div>
</template>

<style scoped></style>
