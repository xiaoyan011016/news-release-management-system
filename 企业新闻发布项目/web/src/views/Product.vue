<template>
  <div>
    <el-carousel
      height="calc(100vh - 59px)"
      direction="vertical"
      :autoplay="false"
      v-if="loopList.length"
    >
      <el-carousel-item v-for="item in loopList" :key="item._id">
        <div
          class="images"
          :style="{
            backgroundImage: `url(http://localhost:3000${item.cover})`,
          }"
        >
          <el-card class="box-card">
            <template #header>
              <div class="card-header">
                <h1>{{ item.title }}</h1>
              </div>
            </template>
            <div class="card-body">
              <div>
                <h2>{{ item.introduction }}</h2>
                <h4>{{ item.detail }}</h4>
              </div>
            </div>
          </el-card>
        </div>
      </el-carousel-item>
    </el-carousel>
    <el-empty v-else description="暂无产品" />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
const loopList = ref([]);
onMounted(async () => {
  const res = await axios.get("/webapi/product/list");
  console.log(res.data.data);
  loopList.value = res.data.data;
});
</script>

<style lang="less" scoped>
.el-carousel__item h3 {
  color: #475669;
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
.images {
  width: 100%;
  height: 100%;
  background-size: cover;
}
.box-card {
  text-align: center;
  width: 50%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.3);
  .card-header {
    h1 {
      margin-top: 150px;
    }
  }
  .card-body {
    h2 {
      padding: 20px 0;
    }
  }
}
</style>