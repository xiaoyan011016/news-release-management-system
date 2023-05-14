<template>
  <el-row>
    <el-col :span="17" :offset="1">
      <div>
        <h2>{{ detailData.title }}</h2>
        <div class="time">{{ formatTime(detailData.editTime) }}</div>
        <el-divider>
          <el-icon><star-filled /></el-icon>
        </el-divider>
        <div class="content" v-html="detailData.content"></div>
      </div>
    </el-col>
    <el-col :span="4" :offset="1" :pull="1">
      <el-card class="box-card">
        <template #header>
          <div class="card-header">
            <span>最近新闻</span>
          </div>
        </template>
        <div
          v-for="item in topNews"
          :key="item._id"
          class="text item"
          style="padding: 5px"
          @click="handleDetail(item._id)"
        >
          <span class="detail-title">{{ item.title }}</span>
          <div class="bottom">
            <time class="detail-time">{{ formatTime(item.editTime) }}</time>
          </div>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>

<script setup>
import axios from "axios";
import { onMounted, ref, watchEffect, onUnmounted, watchPostEffect } from "vue";
import { useRoute } from "vue-router";
import dayjs from "dayjs";
import { StarFilled } from "@element-plus/icons-vue";
import { useRouter } from "vue-router";
const route = useRoute();
const router = useRouter();
const detailData = ref({});
const topNews = ref([]);
// 格式时间
const formatTime = (time) => {
  return dayjs(time).format("YYYY年M月D日 H:m");
};
const handleDetail = (id) => {
  // 往当前页面跳转
  router.push(`/detail/${id}`);
};
const stopWatch = watchEffect(async () => {
  if (!route.params.id) {
    return;
  }
  const res = await axios.get(`/webapi/news/list/${route.params.id}`);
  const res2 = await axios.get("/webapi/news/toplist?limit=4");
  // console.log(res.data.data[0]);
  // console.log(res2.data.data);
  detailData.value = res.data.data[0];
  topNews.value = res2.data.data;
});
onUnmounted(() => {
  stopWatch();
});
</script>

<style lang="less" scoped>
.el-row {
  margin-top: 15px;
}
.time {
  margin-top: 10px;
  font-size: 16px;
  color: #ccc;
}
::v-deep .content img {
  max-width: 100%;
}

.detail-title {
  overflow: hidden;
  /* 将溢出部分用省略号代替 */
  text-overflow: ellipsis;
  /* 弹性伸缩盒子模型显示 */
  display: -webkit-box;
  /* 限制在一个块元素显示的文本行数 */
  -webkit-line-clamp: 2;
  /* 设置或检索伸缩盒对象的子元素的排列方式 */
  -webkit-box-orient: vertical;
  /*最后通过浏览器调试盒子的高度到显示的文本行数位置 2 处即可。*/
  height: 42px;
}
.detail-time {
  font-size: 14px;
  color: #ccc;
}
</style>