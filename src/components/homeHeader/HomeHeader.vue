<script setup>
import { ref } from "vue";

const activeIndex = ref("/");
const handleSelect = (key, keyPath) => {
  console.log(key, keyPath);
};

// import { useRouter } from "vue-router";
// const router = useRouter();
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
    @select="handleSelect"
    :router="true"
  >
    <el-menu-item>
      <img
        style="width: 200px"
        src="/images/windlestone-logo.png"
        alt="Element logo"
      />
    </el-menu-item>
    <el-menu-item index="/">Menu</el-menu-item>
    <el-menu-item index="/simulation">Simulation</el-menu-item>
    <!-- <el-menu-item @click="logout">Logout</el-menu-item> -->
  </el-menu>
</template>

<style scoped>
.el-menu--horizontal > .el-menu-item:nth-child(1) {
  margin-right: auto;
}
</style>
