<template>
  <div>
    <el-page-header title="企业门户管理系统" icon="">
      <template #content>
        <span class="text-large font-600 mr-3"> 首页 </span>
      </template>
    </el-page-header>

    <el-card class="box-card">
      <el-row>
        <el-col :span="4"><el-avatar :size="100" :src="avatarUpload" /></el-col>
        <el-col :span="20" style="line-height: 100px"
          >欢迎 {{ username }} 回来，{{ welcomText }}</el-col
        >
      </el-row>
    </el-card>

    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>公司产品</span>
        </div>
      </template>
      <el-carousel
        :interval="4000"
        type="card"
        height="200px"
        v-if="loopList.length"
      >
        <el-carousel-item v-for="item in loopList" :key="item._id">
          <div
            :style="{
              backgroundImage: `url(http://localhost:3000${item.cover})`,
              backgroundSize: 'cover',
            }"
          >
            <h3 text="2xl" justify="center">{{ item.title }}</h3>
          </div>
        </el-carousel-item>
      </el-carousel>
    </el-card>
  </div>
</template>

<script>
import { computed, onMounted, ref } from "vue";
import { useStore } from "vuex";
import axios from "axios";
export default {
  name: "Home",
  setup() {
    const store = useStore();
    const loopList = ref([]);
    const avatarUpload = computed(() => {
      return store.state.userInfo.avatar
        ? "http://localhost:3000" + store.state.userInfo.avatar
        : "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png";
    });

    const username = computed(() => store.state.userInfo.username);
    const welcomText = computed(() =>
      new Date().getHours() < 12 ? "再睡一会吧" : "喝一杯咖啡提提神吧"
    );

    onMounted(async () => {
      getTableList();
    });
    const getTableList = async () => {
      const res = await axios.get("/adminapi/product/list");
      loopList.value = res.data.data;
    };
    return {
      avatarUpload,
      username,
      welcomText,
      loopList,
    };
  },
};
</script>

<style lang="less" scoped>
.box-card {
  margin-top: 35px;
}
.el-carousel__item h3 {
  color: white;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>