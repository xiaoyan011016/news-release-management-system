<template>
  <Navbar></Navbar>
  <router-view></router-view>
</template>

<script>
import Navbar from "./components/Navbar.vue";
export default {
  name: "App",
  components: { Navbar },
};
</script>

<style lang="less">
// 全局样式
* {
  margin: 0;
  padding: 0;
}
// 设置滚动条的样式
::-webkit-scrollbar {
  width: 5px;
  height: 5px;
  position: absolute;
}
::-webkit-scrollbar-thumb {
  // 滚动条上的滚动滑块的颜色
  background-color: #1890ff;
}
::-webkit-scrollbar-track {
  // 滚动条轨道的颜色
  background: #ddd;
}
</style>