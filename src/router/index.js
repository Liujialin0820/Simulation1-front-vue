import CustomeSimulation from "@/views/customeSimulation/customeSimulation.vue";
import HomeView from "@/views/homeView/HomeView.vue";
import SimulationOne from "@/views/simulationView/SimulationOne.vue";
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/Blackscholessimulation",
      name: "simulation",
      component: SimulationOne,
    },
    {
      path: "/CustomiseSimulation",
      name: "CustomiseSimulation",
      component: CustomeSimulation,
    },
  ],
});

export default router;
