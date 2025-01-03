<template>
  <div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="name" label="Name" width="400" />
      <el-table-column prop="mean" label="Mean" width="100" />
      <el-table-column prop="std" label="Standard Deviation" />
    </el-table>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { useSim1Store } from "@/stores/Sim1";

// Access the store
const useParameters = useSim1Store();

// Reactive table data
const tableData = ref([]);

// Method to transform static data
const transformStaticData = (staticData) => {
  if (!staticData) return []; // Handle undefined staticData
  try {
    staticData = staticData ? JSON.parse(staticData) : {}; // 如果为空，设置为默认空对象
  } catch (error) {
    staticData = {}; // 解析失败时提供安全的默认值
    console.log(error);
  }
  return Object.entries(staticData).map(([key, value]) => ({
    name: key.replace(/_/g, " "), // Replace underscores with spaces for better readability
    mean: value.mean ? value.mean.toFixed(4) : "N/A", // Format mean to 4 decimal places
    std: value.std ? value.std.toFixed(4) : "N/A", // Format std to 4 decimal places
  }));
};

// Watch for changes in staticData
watch(
  () => useParameters.staticData, // Watch the staticData in the store
  (newData) => {
    tableData.value = transformStaticData(newData); // Update tableData when staticData changes
  },
  { immediate: true } // Trigger immediately on component mount
);
</script>

<style scoped>
/* Optional: Add custom styles if necessary */
</style>
