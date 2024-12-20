<script setup>
import { useSim1Store } from "@/stores/Sim1";
import { computed, ref, watch } from "vue";
const props = defineProps(["binstart", "binend", "bins"]);

const data = ref([]); // 初始化为数组
const sim1Store = useSim1Store();
data.value = sim1Store.result;

watch(
  () => sim1Store.result,
  (newResult) => {
    data.value = newResult; // 更新 data
  },
  { immediate: true } // 确保初始执行
);

const gIrrColumn = computed(() => {
  return data.value.map((entry) => entry["G-IRR"]); // 提取 G-IRR 列
});
</script>

<template>
  <HistogramA
    :series_data="gIrrColumn"
    :bin_start="props.binstart"
    :bin_end="props.binend"
    :bin="bins"
    title="G-IRR"
  ></HistogramA>
</template>

<style scoped></style>
