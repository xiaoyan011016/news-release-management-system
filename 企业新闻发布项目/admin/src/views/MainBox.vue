<template>
  <el-container>
    <SideMenu></SideMenu>
    <el-container direction="vertical">
      <TopHeader></TopHeader>
      <el-main> <router-view></router-view></el-main>
    </el-container>
  </el-container>
</template>

<script>
import TopHeader from "@/components/mainbox/TopHeader.vue";
import SideMenu from "@/components/mainbox/SideMenu.vue";
export default {
  name: "MainBox",
  components: { TopHeader, SideMenu },
};
</script>

<style lang="less" scoped>
.el-main {
  height: calc(100vh - 50px);
}
</style>