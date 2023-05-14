<template>
  <el-header>
    <div class="left">
      <el-icon @click="handleCollapseState"><Menu /></el-icon>
      <span style="margin-left: 10px">企业门户网站管理系统</span>
    </div>
    <div class="right">
      <span style="margin-right: 10px">欢迎 {{ username }} 登录</span>
      <el-dropdown>
        <span class="el-dropdown-link">
          <el-icon :size="25"><User /></el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="handleRouterToCenter"
              >个人中心</el-dropdown-item
            >
            <el-dropdown-item @click="handleRouterLayout"
              >退出</el-dropdown-item
            >
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </el-header>
</template>

<script>
// 引入UI组件库
import { Menu, User } from "@element-plus/icons-vue";
// 引入vuex
import { useStore } from "vuex";
// 引入路由
import { useRouter } from "vue-router";
import { computed } from "vue";
export default {
  name: "TopHeader",
  components: { Menu, User },
  setup() {
    const router = useRouter();
    const store = useStore();
    const username = computed(() => {
      return store.state.userInfo.username;
    });

    // 每次调用修改折叠状态
    function handleCollapseState() {
      store.commit("changeCollapse");
    }
    // 跳转center
    function handleRouterToCenter() {
      router.push("/center");
    }
    // 退出功能
    function handleRouterLayout() {
      localStorage.removeItem("token");
      // 清除vuex中的用户信息
      store.commit("clearUserInfo");
      router.push("/login");
    }
    return {
      username,
      handleCollapseState,
      handleRouterToCenter,
      handleRouterLayout,
    };
  },
};
</script>

<style lang="less" scoped>
.el-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #2d3a4b;
  color: white;
  width: 100%;
  height: 50px;
  .right,
  .left {
    display: flex;
    // 让内部字体图标和文字水平居中显示，所以的icon都是基于i标签
    i {
      margin: auto;
      cursor: pointer;
    }
  }
}
</style>