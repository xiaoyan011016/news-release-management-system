<template>
  <div class="home-container">
    <el-carousel height="calc(100vh - 59px)">
      <el-carousel-item :key="1">
        <div
          :style="{
            backgroundImage: `url(${require('@/assets/1.jpg')})`,
          }"
        ></div>
      </el-carousel-item>
      <el-carousel-item :key="2">
        <div
          :style="{
            backgroundImage: `url(${require('@/assets/4.jpg')})`,
          }"
        ></div>
      </el-carousel-item>
      <el-carousel-item :key="3">
        <div
          :style="{
            backgroundImage: `url(${require('@/assets/3.jpg')})`,
          }"
        ></div>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  name: "Home",
};
</script>

<style lang="less" scoped>
.el-carousel {
  div {
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center;
  }
}
</style>