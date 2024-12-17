<script setup>
import BasicBar from "@/components/echarts/barChart/BasicBar.vue";
</script>

<template>
  <div>
    <BasicBar
      :xdata="['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']"
      :ydata="[120, 200, 150, 80, 70, 110, 130]"
    ></BasicBar>
  </div>
</template>

<style scoped></style>
