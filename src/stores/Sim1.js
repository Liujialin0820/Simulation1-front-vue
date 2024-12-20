import { ref } from "vue";
import { defineStore } from "pinia";
import { getBaiscBar } from "@/api/basicapi";

export const useSim1Store = defineStore("sim1Store", () => {
  const parameters = ref("");
  const result = ref([]);
  const id = ref(0);

  const getData = async () => {
    const res = await getBaiscBar("Black Scholes");
    parameters.value = res.Parameters;
    result.value = res.result;
    id.value = res.id;
  };

  return { parameters, result, id, getData };
});
