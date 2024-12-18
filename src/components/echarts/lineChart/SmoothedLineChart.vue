<template>
  <div
    class="echarts-container"
    ref="echartsContainer"
    style="width: 100%; height: 100%"
  ></div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import * as echarts from "echarts";
const props = defineProps([
  "xdata",
  "ydata",
  "xname",
  "yname",
  "title",
  "xAxisMinMax",
  "yAxisMinMax",
  "smooth",
  "color",
]);
const echartsContainer = ref(null);

onMounted(() => {
  if (echartsContainer.value) {
    // 初始化 ECharts 实例
    const myChart = echarts.init(echartsContainer.value);

    // 设置图表配置项和数据
    const option = {
      title: {
        text: props.title,
        textStyle: {
          fontSize: 12, // 设置标题字体大小
          // 其他样式属性
        },
      },
      grid: {
        left: "8%",
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          animation: false,
        },
        valueFormatter: (value) => {
          if (value > 10) {
            return parseFloat(value.toFixed(0)).toLocaleString("en-US"); // 将大于10的数字四舍五入为整数
          } else {
            if (typeof value == "number") {
              return value.toFixed(4); // 小于等于10的数字保留一位小数
            }
          }
        },
      },
      xAxis: {
        type: "category",
        data: props.xdata,
        name: props.xname,
        nameGap: 5,
        boundaryGap: false, // 取消两端的空白
        min: props.xAxisMinMax ? props.xAxisMinMax[0] : null, // 设置坐标轴的最小值
        max: props.xAxisMinMax ? props.xAxisMinMax[1] : null, // 设置坐标轴的最大值
      },
      yAxis: {
        type: "value",
        name: props.yname,
        namelocation: "start",
        nameGap: 15,
        axisLabel: {
          formatter: function (value) {
            if (value >= 100000) {
              return (value / 1000000).toFixed(1) + "M"; // 将大于等于100k的数字转换为M形式
            } else if (value >= 1000) {
              return (value / 1000).toFixed(0) + "k"; // 将大于等于1000的数字转换为k形式
            } else {
              return value;
            }
          },
          margin: 2, // 调整纵轴标签与轴线之间的距离
        },
        min: props.yAxisMinMax ? props.yAxisMinMax[0] : null, // 设置坐标轴的最小值
        max: props.yAxisMinMax ? props.yAxisMinMax[1] : null, // 设置坐标轴的最小值
      },
      series: [
        {
          data: props.ydata,
          type: "line",
          color: props.color,
          smooth: props.smooth ?? true,
        },
      ],
    };

    // 使用配置项和数据绘制图表
    myChart.setOption(option);

    // 监听数据变化
    watch(
      () => props.ydata,
      (newXdata, oldXdata) => {
        if (JSON.stringify(newXdata) !== JSON.stringify(oldXdata)) {
          // 当数据变化时重新渲染图表
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
      }
    );
  }
});
</script>

<style scoped>
.echarts-container {
  /* 设置图表容器样式 */
  background-color: white;
}
</style>
