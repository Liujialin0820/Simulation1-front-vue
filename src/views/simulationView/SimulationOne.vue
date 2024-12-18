<script setup>
import { getBaiscBar, updateParameter } from "@/api/basicapi";
import SmoothedLineChart from "@/components/echarts/lineChart/SmoothedLineChart.vue";
import { onMounted, ref } from "vue";

const barData = ref({});
const K = ref("");
let id = 2;

onMounted(async () => {
  getData();
});

const updateK = async () => {
  await updateParameter(id, "K", K.value);
  getData();
};

const getData = async () => {
  const res = await getBaiscBar("Call Option");
  barData.value = res.data;
  K.value = res.K.value;
  id = res.id;
};
</script>

<template>
  <div class="module">
    <div style="height: 60%; width: 50%">
      <SmoothedLineChart
        :xdata="barData.x"
        :ydata="barData.y"
        xname="St"
        yname="Ct"
        :smooth="false"
        color="red"
      ></SmoothedLineChart>
    </div>
    <div>
      K:
      <el-input
        v-model="K"
        style="width: 140px"
        placeholder="Please input"
        @keyup.enter="updateK"
      />
      <el-button @click="updateK">PUT</el-button>
    </div>
  </div>
</template>

<style scoped></style>
