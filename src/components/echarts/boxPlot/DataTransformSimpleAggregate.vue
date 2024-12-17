<template>
  <div
    class="echarts-container"
    ref="echartsContainer"
    style="width: 100%; height: 100%"
  ></div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import * as echarts from "echarts";
const props = defineProps(["ydata", "xdata", "xname", "yname", "title"]);
const echartsContainer = ref(null);

onMounted(() => {
  // 引入 echarts-simple-transform
  const script = document.createElement("script");
  script.src =
    "https://fastly.jsdelivr.net/npm/echarts-simple-transform/dist/ecSimpleTransform.min.js";
  script.async = true;
  document.head.appendChild(script);

  // 当脚本加载完成后执行 run 函数
  script.onload = () => {
    // 这里你可以调用 run 函数
    // 如果需要运行 run 函数，你可以将它复制到这里

    // 初始化 ECharts 实例
    const myChart = echarts.init(echartsContainer.value);
    echarts.registerTransform(ecSimpleTransform.aggregate);

    function transformData(obj) {
      const result = [];

      // 添加 xname 和 yname 到结果数组的第一项
      result.push(["Country", "Income", "Year"]);

      // 添加 xdata 和 ydata 中对应位置的值到结果数组
      for (let i = 0; i < obj.xdata.length; i++) {
        result.push([obj.xdata[i], obj.ydata[i], 1951]);
      }

      return result;
    }

    // 设置图表配置项和数据
    const option = {
      dataset: [
        {
          id: "raw",
          source: transformData(props),
        },
        {
          id: "since_year",
          fromDatasetId: "raw",
          transform: [
            {
              type: "filter",
              config: {
                dimension: "Year",
                gte: 1950,
              },
            },
          ],
        },
        {
          id: "income_aggregate",
          fromDatasetId: "since_year",
          transform: [
            {
              type: "ecSimpleTransform:aggregate",
              config: {
                resultDimensions: [
                  { name: "min", from: "Income", method: "min" },
                  { name: "Q1", from: "Income", method: "Q1" },
                  { name: "Q3", from: "Income", method: "Q3" },
                  { name: "median", from: "Income", method: "median" },
                  { name: "mean", from: "Income", method: "average" },
                  { name: "max", from: "Income", method: "max" },
                  { name: "Country", from: "Country" },
                ],
                groupBy: "Country",
              },
            },
            {
              type: "sort",
              config: {
                dimension: "Country",
                order: "asc",
              },
            },
          ],
        },
      ],
      grid: {
        bottom: "5%", // 将底部空白区域设置为 10%
      },
      title: {
        text: props.title,
      },
      tooltip: {
        trigger: "axis",
        confine: true,
        textStyle: {
          align: "left", // 设置文字左对齐
        },
        valueFormatter: (value) => {
          if (value > 100) {
            return parseFloat(value.toFixed(0)).toLocaleString("en-US"); // 将大于10的数字四舍五入为整数
          } else if (value > 10) {
            return parseFloat(value.toFixed(2)).toLocaleString("en-US"); // 将大于10的数字四舍五入为整数
          } else {
            if (typeof value == "number") {
              return value.toFixed(4); // 小于等于10的数字保留一位小数
            }
          }
        },
      },
      yAxis: {
        name: props.yname,
        nameLocation: "middle",
        nameGap: 30,
        scale: true,
      },
      xAxis: {
        name: props.xname,
        type: "category",
        nameGap: 5,
      },

      legend: {
        selected: { detail: false },
      },
      //   dataZoom: [
      //     {
      //       type: "inside",
      //     },
      //     {
      //       type: "slider",
      //       height: 20,
      //     },
      //   ],
      series: [
        {
          name: "boxplot",
          type: "boxplot",
          datasetId: "income_aggregate",
          itemStyle: {
            color: "#b8c5f2",
          },
          encode: {
            y: ["min", "Q1", "median", "Q3", "max"],
            x: "Country",
            itemName: ["Country"],
            tooltip: ["max", "Q3", "median", "mean", "Q1", "min"],
          },
        },
        {
          name: "detail",
          type: "scatter",
          datasetId: "since_year",
          symbolSize: 6,
          tooltip: {
            trigger: "item",
          },
          label: {
            show: false,
            position: "top",
            align: "left",
            verticalAlign: "middle",
            rotate: 90,
            fontSize: 12,
          },
          itemStyle: {
            color: "#d00000",
          },
          encode: {
            y: "Income",
            x: "Country",
            label: "Year",
            itemName: "Year",
            tooltip: ["Country", "Year", "Income"],
          },
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
            dataset: [
              {
                id: "raw",
                source: transformData(props),
              },
            ],
          });
        }
      }
    );
  };
});
</script>

<style scoped>
.echarts-container {
  /* 设置图表容器样式 */
  background-color: white;
}
</style>
