<script setup>
import { useSim1Store } from "@/stores/Sim1";
import { onMounted, ref } from "vue";
import {
  createParameters,
  getParameters,
  makeBlackScholesSimulation,
} from "@/api/basicapi";
import MultiBar from "@/views/simulationView/components/parametersTable/MultiBar.vue";
import StaticTable from "@/views/simulationView/components/parametersTable/StaticTable.vue";

const useParameters = useSim1Store();
const tableData = ref([]);
let loading = defineModel();

onMounted(async () => {
  loading.value = true;
  await get_parameters(); // 等待数据加载完成
  await get_data();
  loading.value = false;
});

//#region parameters

const get_parameters = async () => {
  const ref = await getParameters();
  console.log(ref[ref.length - 1]);

  const transformedParameterData = Object.entries(ref[ref.length - 1])
    .filter(([key]) => key !== "help_texts") // Exclude the "help_texts" key
    .map(([key, value]) => ({
      name: key,
      value: value,
      desc: ref[ref.length - 1].help_texts?.[key] || "", // Get help_text or default to an empty string
    }));
  tableData.value = [...transformedParameterData]; // 确保重新触发响应性
};

const convertToNameValue = (data) => {
  // 将数组转换为 { name: value } 格式
  return data.reduce((result, item) => {
    result[item.name] = item.value;
    return result;
  }, {});
};

//#endregion

const get_data = async () => {
  loading.value = true;
  await useParameters.get_data();
  loading.value = false;
};

const creat_new_data = async () => {
  loading.value = true;
  await createParameters(convertToNameValue(tableData.value));
  await makeBlackScholesSimulation({ model: "customise" });
  await useParameters.get_data();
  await get_parameters();
  loading.value = false;
};
</script>

<template>
  <div class="parameters">
    <div class="left-column">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="name" label="Parameters" width="180" />
        <el-table-column prop="value" label="Value" width="180">
          <template v-slot="scope">
            <el-input
              type="number"
              v-model.number="scope.row.value"
              :disabled="['C', 'T'].includes(scope.row.name)"
            />
          </template>
        </el-table-column>
        <el-table-column prop="desc" label="Description" width="180" />
      </el-table>
      <div style="margin-top: 20px">
        <el-button @click="creat_new_data">Create New Simulation</el-button>
      </div>
    </div>
    <div class="right-column">
      <div style="height: 600px">
        <MultiBar></MultiBar>
      </div>
      <div>
        <StaticTable></StaticTable>
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
