<script setup>
import { computed, toRefs } from "vue";
import BasicBar from "./BasicBar.vue";

const props = defineProps([
  "xdata",
  "ydata",
  "xname",
  "yname",
  "title",
  "right_grid",
  "xAxisMinMax",
  "yAxisMinMax",
  "series_data",
  "bin",
  "bin_start",
  "bin_end",
]);

const { series_data, bin, bin_start, bin_end } = toRefs(props);

// 使用传入的 bin 值，如果没有传入则默认为 10
const binCount = computed(() => {
  const binValue = Number(bin.value); // 显式转换为数字
  return !isNaN(binValue) && binValue > 0 ? binValue : 10; // 检查有效性
});

// 获取数据的最大值和最小值
const minValue = computed(() => {
  const startValue = Number(bin_start.value); // 显式转换为数字
  return typeof startValue === "number" && !isNaN(startValue)
    ? startValue
    : Math.min(...series_data.value);
});

const maxValue = computed(() => {
  const endValue = Number(bin_end.value); // 显式转换为数字
  return typeof endValue === "number" && !isNaN(endValue)
    ? endValue
    : Math.max(...series_data.value);
});

// 计算每个 bin 的大小
const binSize = computed(
  () => (maxValue.value - minValue.value) / binCount.value
);

// 创建响应式的 `groupedData` 来存储分组统计结果
const groupedData = computed(() => {
  const bins = Array(binCount.value).fill(0); // 初始化每个 bin 的计数为 0

  // 遍历 series_data 对每个数字进行分组
  series_data.value.forEach((value) => {
    const binIndex = Math.floor((value - minValue.value) / binSize.value);

    // 如果 binIndex 是 binCount.value，表示值等于最大值，放到最后一个 bin
    if (binIndex === binCount.value) {
      bins[binIndex - 1] += 1;
    } else if (binIndex < binCount.value) {
      bins[binIndex] += 1;
    }
  });

  // 返回分组的计数和 bin 的范围
  return bins.map((count, index) => ({
    binRange: `${(minValue.value + index * binSize.value).toFixed(2)} - ${(
      minValue.value +
      (index + 1) * binSize.value
    ).toFixed(2)}`,
    count,
  }));
});

// 提取 binRange 和 count
const binRange = computed(() => groupedData.value.map((item) => item.binRange));
const count = computed(() => groupedData.value.map((item) => item.count));
</script>

<template>
  <!-- 使用 BasicBar 组件 -->
  <BasicBar v-bind="props" :xdata="binRange" :ydata="count"></BasicBar>
</template>

<style scoped></style>
