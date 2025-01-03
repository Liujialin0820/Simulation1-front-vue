import HomeView from "@/views/homeView/HomeView.vue";
import BlackScholesSimulation from "@/views/SimulationOne/BlackScholesSimulation/BlackScholesSimulation.vue";
import CustomeSimulation from "@/views/SimulationOne/CustomeSimulation/customeSimulation.vue";
import SimulationOne from "@/views/SimulationOne/SimulationOne.vue";
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
      children: [
        { path: "blackscholes", component: BlackScholesSimulation },
        { path: "custom", component: CustomeSimulation },
      ],
    },
  ],
});

export default router;
