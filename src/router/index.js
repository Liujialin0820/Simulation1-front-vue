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
      path: "/simulation",
      name: "simulation",
      component: SimulationOne,
    },
  ],
});

export default router;
