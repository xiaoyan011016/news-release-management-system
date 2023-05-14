<template>
  <div class="navbar-content">
    <el-menu
      :default-active="route.fullPath"
      class="navbar"
      mode="horizontal"
      :router="true"
    >
      <el-menu-item index="/">首页</el-menu-item>
      <el-menu-item index="/news">新闻</el-menu-item>
      <el-menu-item index="/product">产品</el-menu-item>
      <el-menu-item index="" @click="handleLogin">登录</el-menu-item>
    </el-menu>
    <div class="name">新闻门户网站</div>
  </div>
</template>

<script>
import { useRoute } from "vue-router";
export default {
  name: "Navbar",
  setup() {
    const route = useRoute();
    const handleLogin = () => {
      window.location = "http://localhost:8080";
    };
    return {
      route,
      handleLogin,
    };
  },
};
</script>

<style scoped lang="less">
.navbar-content {
  position: sticky;
  top: 0px;
  z-index: 10000;
}
.name {
  position: fixed;
  top: 0px;
  right: 15px;
  height: 59px;
  line-height: 59px;
}
</style>