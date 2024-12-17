<script setup>
import { getBaiscBar } from "@/api/basicapi";
import BasicBar from "@/components/echarts/barChart/BasicBar.vue";
import { onMounted, ref } from "vue";

const barData = ref({});
onMounted(async () => {
  const res = await getBaiscBar();
  barData.value = res;
  console.log(res);
});
</script>

<template>
  <div>
    <BasicBar :xdata="barData.xdata" :ydata="barData.ydata"></BasicBar>
  </div>
</template>

<style scoped></style>
