<template>
  <div
    class="echarts-container"
    ref="echartsContainer"
    style="width: 100%; height: 100%"
  ></div>
</template>

<script>
import { ref, onMounted, onUnmounted, watch } from "vue";
import * as echarts from "echarts";

export default {
  props: {
    xdata: {
      type: Array,
      required: true,
    },
    ydata: {
      type: Array,
      required: true,
    },
    xname: {
      type: String,
      default: "",
    },
    yname: {
      type: String,
      default: "",
    },
    title: {
      type: String,
      default: "",
    },
    right_grid: {
      type: Number,
      default: 50,
    },
    xAxisMinMax: {
      type: Array,
      default: () => [null, null],
    },
    yAxisMinMax: {
      type: Array,
      default: () => [null, null],
    },
  },
  setup(props) {
    const echartsContainer = ref(null);
    let myChart = null;

    // 创建图表配置项
    const createChartOption = () => ({
      grid: {
        right: props.right_grid,
      },
      title: {
        text: props.title,
        textStyle: {
          fontSize: 12,
        },
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          animation: false,
        },
        valueFormatter: (value) => {
          if (value > 10) {
            return parseFloat(value.toFixed(0)).toLocaleString("en-US");
          } else {
            return value.toFixed(4);
          }
        },
      },
      xAxis: {
        type: "category",
        data: props.xdata,
        name: props.xname,
        nameGap: 5,
        min: props.xAxisMinMax[0],
        max: props.xAxisMinMax[1],
      },
      yAxis: {
        type: "value",
        axisLabel: {
          formatter: (value) => {
            if (value >= 1000000) {
              return (value / 1000000).toFixed(1) + "M";
            } else if (value >= 1000) {
              return (value / 1000).toFixed(0) + "k";
            } else {
              return value.toString();
            }
          },
          margin: 2,
        },
        min: props.yAxisMinMax[0],
        max: props.yAxisMinMax[1],
      },
      series: [
        {
          data: props.ydata,
          type: "bar",
          smooth: true,
        },
      ],
    });

    // 初始化图表
    const initChart = () => {
      if (echartsContainer.value) {
        myChart = echarts.init(echartsContainer.value);
        myChart.setOption(createChartOption());
      }
    };

    // 更新图表数据
    const updateChart = () => {
      if (myChart) {
        myChart.setOption({
          xAxis: {
            data: props.xdata,
            name: props.xname,
          },
          series: [
            {
              data: props.ydata,
            },
          ],
        });
      }
    };

    onMounted(() => {
      initChart();

      // 监听数据变化
      watch(
        () => [props.xdata, props.ydata],
        ([newXdata, newYdata], [oldXdata, oldYdata]) => {
          if (
            JSON.stringify(newXdata) !== JSON.stringify(oldXdata) ||
            JSON.stringify(newYdata) !== JSON.stringify(oldYdata)
          ) {
            updateChart();
          }
        }
      );
    });

    // 清理图表实例
    onUnmounted(() => {
      if (myChart) {
        myChart.dispose();
        myChart = null;
      }
    });

    return {
      echartsContainer,
    };
  },
};
</script>

<style scoped>
.echarts-container {
  background-color: white;
}
</style>
