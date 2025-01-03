<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
const route = useRoute(); // 获取当前路由对象

const activeIndex = computed(() => {
  return route.path; // 返回当前路径
});

// const logout = () => {
//   localStorage.clear();
//   router.push("/");
// };
</script>

<template>
  <el-menu
    :default-active="activeIndex"
    class="el-menu-demo"
    mode="horizontal"
    :ellipsis="false"
    :router="true"
  >
    <el-menu-item>
      <!-- <img
        style="width: 200px"
        src="/images/windlestone-logo.png"
        alt="Element logo"
      /> -->
      <el-menu-item index="/">Home</el-menu-item>
    </el-menu-item>
    <el-menu-item index="/simulation/blackscholes"
      >Black Scholes Simulation</el-menu-item
    >
    <el-menu-item index="/simulation/custom">Customise Simulation</el-menu-item>
    <!-- <el-menu-item @click="logout">Logout</el-menu-item> -->
  </el-menu>
</template>

<style scoped>
.el-menu--horizontal > .el-menu-item:nth-child(1) {
  margin-right: auto;
}
</style>
