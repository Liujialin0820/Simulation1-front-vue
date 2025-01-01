import { ref } from "vue";
import { defineStore } from "pinia";
import { getData } from "@/api/basicapi";

export const useSim1Store = defineStore("sim1Store", () => {
  const charData = ref([]);
  const xAxisData = ref([]);
  const staticData = ref([]);

  const get_data = async () => {
    const res = await getData();
    charData.value = res.charData;
    xAxisData.value = res.xAxisData;
    staticData.value = res.static_data;
  };

  return { charData, xAxisData, get_data, staticData };
});
