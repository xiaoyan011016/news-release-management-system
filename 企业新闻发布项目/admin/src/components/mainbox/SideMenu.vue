<template>
  <el-aside :width="!store.state.isCollapse ? '200px' : '64px'">
    <el-menu
      :collapse="store.state.isCollapse"
      :collapse-transition="false"
      :router="true"
      :default-active="route.path"
    >
      <!-- index必须是唯一标志,所以采取路径控制，因为每一个路径均是不同 -->
      <el-menu-item index="/index">
        <el-icon><HomeFilled></HomeFilled></el-icon>
        <span>首页</span>
      </el-menu-item>
      <el-menu-item index="/center">
        <el-icon><Avatar></Avatar></el-icon>
        <span>个人中心</span>
      </el-menu-item>
      <el-sub-menu index="/user-manage" v-isShow>
        <template #title>
          <el-icon><UserFilled /></el-icon>
          <span>用户管理</span>
        </template>
        <el-menu-item index="/user-manage/useradd">添加用户</el-menu-item>
        <el-menu-item index="/user-manage/userlist">用户列表</el-menu-item>
      </el-sub-menu>
      <el-sub-menu index="/news-manage">
        <template #title>
          <el-icon><MessageBox></MessageBox></el-icon>
          <span>新闻管理</span>
        </template>
        <el-menu-item index="/news-manage/newsadd">添加新闻</el-menu-item>
        <el-menu-item index="/news-manage/newslist">新闻列表</el-menu-item>
      </el-sub-menu>
      <el-sub-menu index="/product-manage">
        <template #title>
          <el-icon><Reading></Reading></el-icon>
          <span>产品管理</span>
        </template>
        <el-menu-item index="/product-manage/productadd">添加产品</el-menu-item>
        <el-menu-item index="/product-manage/productlist"
          >产品列表</el-menu-item
        >
      </el-sub-menu>
    </el-menu>
  </el-aside>
</template>

<script>
import {
  HomeFilled,
  Avatar,
  UserFilled,
  MessageBox,
  Reading,
  Pointer,
} from "@element-plus/icons-vue";
// 导入vuex
import { useStore } from "vuex";
// 导入vue-router
import { useRoute } from "vue-router";
export default {
  name: "SideMenu",
  components: { HomeFilled, Avatar, UserFilled, MessageBox, Reading, Pointer },
  directives: {
    isShow: {
      mounted(el, binding) {
        const { role } = binding.instance.store.state.userInfo;
        if (role === 2) {
          el.parentNode.removeChild(el, binding);
        }
      },
    },
  },
  setup() {
    const store = useStore();
    const route = useRoute();
    return {
      store,
      route,
    };
  },
};
</script>

<style lang="less" scoped>
.el-aside {
  // Vh:1vh 等于视口高度的1%
  height: 100vh;
  .el-menu {
    height: 100vh;
  }
}
</style>