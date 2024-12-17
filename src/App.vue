<script setup>
import HomeHeaderVue from "@/components/HomeHeader/HomeHeader.vue";

</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-header><HomeHeaderVue></HomeHeaderVue></el-header>
      <el-main><router-view></router-view></el-main>
    </el-container>
  </div>
</template>

<style>
/* 全局样式重置 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html,
body {
  width: 100%;
  height: 100%;
}

body {
  font-family: sans-serif;
  line-height: 1.5;
  color: #000;
  background-color: #fff;
}

/* 移除列表默认样式 */
ul,
ol {
  list-style: none;
}

/* 移除链接下划线 */
a {
  text-decoration: none;
  color: inherit;
}

/* 重置表格 */
table {
  border-collapse: collapse;
  border-spacing: 0;
}

/* 输入框样式重置 */
input,
button,
textarea {
  border: none;
  outline: none;
  background: none;
}

button {
  cursor: pointer;
}
</style>
