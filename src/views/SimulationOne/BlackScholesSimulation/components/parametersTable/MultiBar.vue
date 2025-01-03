<script setup>
import MultiBarChart from "@/components/echarts/barChart/MultiBarChart.vue";
import { useSim1Store } from "@/stores/Sim1";

const useParameters = useSim1Store();


</script>

<template>
  <MultiBarChart
    :chartData="useParameters.charData.filter(item => item.name !== 'delta tax')"
    :xAxisData="useParameters.xAxisData"
  />
</template>

<style scoped></style>
