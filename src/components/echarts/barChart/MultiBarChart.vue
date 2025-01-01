<template>
  <div ref="chart" style="width: 100%; height: 100%"></div>
</template>

<script setup>
import * as echarts from "echarts";
import { ref, onMounted, watch } from "vue";

// Define props for dynamic data
const props = defineProps({
  chartData: {
    type: Array,
    required: true,
  },
  xAxisData: {
    type: Array,
    required: true,
  },
});

// Refs for chart DOM and instance
const chart = ref(null);
let myChart = null;

// Generate series configuration dynamically
const generateSeries = (data) => {
  return data.map((item) => ({
    name: item.name,
    type: "bar",
    emphasis: {
      focus: "series",
    },
    data: item.data,
  }));
};

// Create chart option dynamically
const createChartOption = (chartData, xAxisData) => ({
  tooltip: {
    trigger: "axis",
    axisPointer: {
      type: "shadow",
    },
  },
  legend: {
    data: chartData.map((item) => item.name),
  },
  toolbox: {
    show: true,
    orient: "vertical",
    left: "right",
    top: "center",
    feature: {
      mark: { show: true },
      dataView: { show: true, readOnly: false },
      magicType: { show: true, type: ["line", "bar", "stack"] },
      saveAsImage: { show: true },
    },
  },
  xAxis: [
    {
      type: "category",
      axisTick: { show: false },
      data: xAxisData,
    },
  ],
  yAxis: [
    {
      type: "value",
    },
  ],
  series: generateSeries(chartData),
});

// Initialize chart
onMounted(() => {
  if (chart.value) {
    myChart = echarts.init(chart.value);
    myChart.setOption(createChartOption(props.chartData, props.xAxisData));
  }
});

// Watch for changes in chartData and xAxisData
watch(
  () => [props.chartData, props.xAxisData],
  ([newChartData, newXAxisData]) => {
    if (myChart) {
      myChart.setOption({
        legend: {
          data: newChartData.map((item) => item.name),
        },
        xAxis: [
          {
            data: newXAxisData,
          },
        ],
        series: generateSeries(newChartData),
      });
    }
  },
  { deep: true }
);
</script>
