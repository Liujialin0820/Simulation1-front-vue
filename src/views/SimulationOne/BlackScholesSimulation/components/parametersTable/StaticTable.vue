
<script setup>
import { ref, watch } from "vue";
import { useSim1Store } from "@/stores/Sim1";

// Access the store
const useParameters = useSim1Store();

// Reactive table data
const tableData = ref([]);

// 函数：根据名称匹配税务数据键
function getTaxKey(name) {
  if (name.includes("Income") && name.includes("Share")) {
    return "Share_IP_tax";
  } else if (name.includes("Growth") && name.includes("Share")) {
    return "Share_GP_tax";
  } else if (name.includes("Income") && name.includes("Product")) {
    return "Product_IP_tax";
  } else if (name.includes("Growth") && name.includes("Product")) {
    return "Product_GP_tax";
  } else {
    return null; // 无匹配
  }
}

// Method to transform static data
const transformStaticData = (staticData) => {
  if (!staticData) return []; // Handle undefined staticData
  try {
    staticData = staticData ? JSON.parse(staticData) : {}; // 如果为空，设置为默认空对象
  } catch (error) {
    staticData = {}; // 解析失败时提供安全的默认值
    console.log(error);
  }
  return Object.entries(staticData).map(([key, value]) => {
    const name = key.replace(/_/g, " "); // 替换下划线为空格以提高可读性
    const isDelta = name.toLowerCase().includes("tax"); // 检查名称是否包含 "delta"（不区分大小写）

    return {
      name,
      mean:
        value.mean !== undefined && value.mean !== null
          ? isDelta
            ? value.mean.toFixed(2) // 如果包含 "delta"，保留两位小数，不添加 "%"
            : `${(value.mean * 100).toFixed(2)}%` // 否则，转换为百分比并保留两位小数
          : "N/A",
      std:
        value.std !== undefined && value.std !== null
          ? isDelta
            ? value.std.toFixed(2) // 如果包含 "delta"，保留两位小数，不添加 "%"
            : `${(value.std * 100).toFixed(2)}%` // 否则，转换为百分比并保留两位小数
          : "N/A",
    };
  });
};

const addTaxData = (dataArray, taxDataObj) => {
  try {
    taxDataObj = JSON.parse(taxDataObj);
  } catch (error) {
    console.warn("JSON parse error:", error);
    return {};
  }
  return dataArray.map((item) => {
    const taxKey = getTaxKey(item.name);
    return {
      ...item,
      tax: taxKey && taxDataObj[taxKey] ? taxDataObj[taxKey].mean : null,
    };
  });
};

// Watch for changes in staticData
watch(
  () => useParameters.staticData, // Watch the staticData in the store
  (newData) => {
    if (!newData || (Array.isArray(newData) && newData.length === 0)) {
      console.warn("newData is empty. Skipping tableData update.");
      return; // 如果 newData 为空，则跳过后续逻辑
    }
    tableData.value = transformStaticData(newData); // Update tableData when staticData changes
    tableData.value = addTaxData(tableData.value, useParameters.taxStatic); // Update tableData when staticData changes
  },
  { immediate: true } // Trigger immediately on component mount
);
</script>

<template>
  <div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="name" label="Name" width="300" />
      <el-table-column prop="mean" label="Mean" width="100" />
      <el-table-column prop="std" label="Standard Deviation" />
      <el-table-column prop="tax" label="Mean tax paid" />
    </el-table>
  </div>
</template>

<style scoped>
/* Optional: Add custom styles if necessary */
</style>
