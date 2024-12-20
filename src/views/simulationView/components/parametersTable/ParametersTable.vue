<script setup>
import { useSim1Store } from "@/stores/Sim1";
import { onMounted, ref } from "vue";
import Histogram_G_IRR from "./Histogram_G_IRR.vue";
import Histogram_I_IRR from "./Histogram_I_IRR.vue";
import { updateParameter } from "@/api/basicapi";

const useParameters = useSim1Store();
let parameters = {};
const tableData = ref([]);

onMounted(() => {
  updateData();
});

const updateData = async () => {
  await useParameters.getData();

  let data = useParameters.parameters;
  const formattedData = Object.keys(data).map((key) => ({
    name: key,
    value: data[key].value,
    desc: data[key].desc,
  }));
  parameters = formattedData;
  tableData.value = parameters;
};

const re_simu = () => {
  updateData();
};

const change_parameters = async () => {
  console.log(tableData.value);
  await updateParameter(tableData.value);
  updateData();
};

// 分桶设置
const bins = ref("100");
const binstart = ref("min");
const binend = ref("max");
</script>

<template>
  <div class="parameters">
    <div class="left-column">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="name" label="Parameters" width="180" />
        <el-table-column prop="value" label="Value" width="180">
          <template v-slot="scope">
            <el-input type="number" v-model.number="scope.row.value" />
          </template>
        </el-table-column>
        <el-table-column prop="desc" label="Description" width="180" />
      </el-table>
      <div style="margin-top: 20px">
        <el-button @click="re_simu">Retry Simulation</el-button>
        <el-button @click="change_parameters">Change Parameters</el-button>
      </div>
    </div>
    <div class="right-column">
      <div style="height: 400px">
        <Histogram_I_IRR
          :binend="binend"
          :binstart="binstart"
          :bins="bins"
        ></Histogram_I_IRR>
      </div>
      <div style="height: 400px">
        <Histogram_G_IRR
          :binend="binend"
          :binstart="binstart"
          :bins="bins"
        ></Histogram_G_IRR>
      </div>
      <div
        style="
          margin-top: -40px;
          margin-left: 20px;
          display: flex;
          z-index: 1000; /* 确保它位于其他元素之上 */
        "
      >
        <div>
          <el-input v-model="binstart" style="max-width: 160px">
            <template #prepend>bin start</template>
          </el-input>
          <el-input v-model="binend" style="max-width: 160px; margin-left: 5px">
            <template #prepend>bin end</template>
          </el-input>
          <el-input v-model="bins" style="max-width: 180px; margin-left: 5px">
            <template #prepend>bin number</template>
          </el-input>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.parameters {
  display: flex;
  justify-content: space-between;
}
.left-column {
  width: 50%;
}
.right-column {
  width: 50%;
  display: flex;
  flex-direction: column;
}
.right-column div {
  margin-bottom: 10px;
}
</style>
