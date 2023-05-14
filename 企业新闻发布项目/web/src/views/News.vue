<template>
  <div class="news-container">
    <!-- 顶部背景图 -->
    <div
      class="header"
      :style="{
        backgroundImage: `url(${require('@/assets/2.jpg')})`,
      }"
    >
      <div class="title">
        <h1>新闻咨询</h1>
        <h3>为您推荐公司及行业的前沿信息，让您随时了解行业动态！</h3>
      </div>
    </div>
    <!-- 搜索筛选框 -->
    <div class="search">
      <el-popover
        placement="bottom"
        title="搜索结果"
        width="50%"
        :visible="visible"
      >
        <template #reference>
          <el-input
            v-model="inputText"
            class="w-50 m-2"
            placeholder="请输入内容"
            :prefix-icon="Search"
            type="search"
            size="large"
            @input="visible = true"
            @blur="visible = false"
          />
        </template>
        <div v-if="searchList.length">
          <div
            class="search-item"
            v-for="item in searchList"
            :key="item._id"
            @click="handleDetail(item._id)"
          >
            {{ item.title }}
          </div>
        </div>
        <div v-else><el-empty description="没有找到哦" image-size="50" /></div>
      </el-popover>
    </div>
    <!-- 顶部显示四个数据展示 -->
    <div class="topshow">
      <el-row :gutter="20">
        <el-col :span="6" v-for="item in topList" :key="item._id">
          <el-card shadow="hover" @click="handleDetail(item._id)">
            <div
              class="images"
              :style="{
                backgroundImage: `url(http://localhost:3000${item.cover})`,
              }"
            ></div>
            <div>
              <span class="news-title">{{ item.title }}</span>
              <div class="bottom">
                <time class="time">{{ formatTime(item.editTime) }}</time>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <!-- 俺新闻种类显示数据 -->
    <el-tabs style="margin: 15px" v-model="activeName" class="demo-tabs">
      <!-- 遍历数据项生成 -->
      <el-tab-pane
        v-for="item in tabList"
        :key="item.name"
        :label="item.label"
        :name="item.name"
      >
        <el-row :gutter="20">
          <!-- 左侧图标文字区域 -->
          <el-col :span="18">
            <div
              style="margin: 15px"
              v-for="data in tabNews[item.name]"
              :key="data._id"
            >
              <el-card shadow="hover" @click="handleDetail(data._id)">
                <div
                  class="tab-images"
                  :style="{
                    backgroundImage: `url(http://localhost:3000${data.cover})`,
                  }"
                ></div>
                <div>
                  <span class="tab-title">{{ data.title }}</span>
                  <div class="bottom">
                    <time class="tab-time">{{
                      formatTime(data.editTime)
                    }}</time>
                  </div>
                </div>
              </el-card>
            </div>
          </el-col>
          <!-- 右侧时间线区域 -->
          <el-col :span="6">
            <el-timeline>
              <el-timeline-item
                v-for="(activity, index) in tabNews[item.name]"
                :key="index"
                :timestamp="formatTime(activity.timestamp)"
                @click="handleDetail(activity._id)"
              >
                {{ activity.title }}
              </el-timeline-item>
            </el-timeline>
          </el-col>
        </el-row>
      </el-tab-pane>
    </el-tabs>
    <el-backtop :right="100" :bottom="100" />
  </div>
</template>

<script setup>
import { Search } from "@element-plus/icons-vue";
import axios from "axios";
import { computed, onMounted, ref } from "vue";
import dayjs from "dayjs";
import _ from "lodash";
import { useRouter } from "vue-router";
const router = useRouter();
const inputText = ref();
const visible = ref(false);
const newsList = ref([]);
const activeName = ref(1);
//存放筛选的数据
const searchList = computed(() => {
  if (inputText.value === "") {
    return [];
  } else {
    return newsList.value.filter(
      (item) => item.title.includes(inputText.value) //将用户输入的值进行匹配
    );
  }
});
// 顶部显示四个数据展示
const topList = computed(() => newsList.value.slice(0, 4));
// 新闻tabname种类分类显示
const tabList = [
  //tab标签页的显示内容，
  {
    label: "最新动态",
    name: 1,
  },
  {
    label: "典型案例",
    name: 2,
  },
  {
    label: "通知公告",
    name: 3,
  },
];
// 计算分类后的新闻种类
const tabNews = computed(() => _.groupBy(newsList.value, "category"));
// 格式时间
const formatTime = (time) => {
  return dayjs(time).format("YYYY年M月D日 H:m");
};
// 处理新闻跳转
const handleDetail = (id) => {
  router.push(`/detail/${id}`);
};
// 获取列表数据
onMounted(async () => {
  const res = await axios.get("/webapi/news/list");
  newsList.value = res.data.data;
  // console.log(res.data.data);
  // console.log(_.groupBy(newsList.value, "category"));
});
</script>

<style lang="less" scoped>
.news-container {
  position: relative; //定位搜索框位置
}

.header {
  width: 100%;
  height: 400px;
  background-size: cover;
  .title {
    position: absolute;
    top: 160px;
    left: 50%;
    transform: translate(-50%, -50%);
    color: white;
    h1 {
      font-size: 36px;
      margin-bottom: 15px;
    }
    h3 {
      font-size: 26px;
    }
  }
}

.search {
  position: absolute;
  top: 260px;
  width: 100%;
  text-align: center;
  .el-input {
    width: 50%;
  }
}
.search-item {
  overflow: hidden;
  /* 将溢出部分用省略号代替 */
  text-overflow: allipsis;
  /* 弹性伸缩盒子模型显示 */
  display: -webkit-box;
  /* 限制在一个块元素显示的文本行数 */
  -webkit-line-clamp: 1;
  /* 设置或检索伸缩盒对象的子元素的排列方式 */
  -webkit-box-orient: vertical;
  /*最后通过浏览器调试盒子的高度到显示的文本行数位置 2 处即可。*/
  height: 45px;
  line-height: 45px;
  cursor: pointer;
  &:hover {
    background-color: rgba(204, 204, 204, 0.3);
    color: red;
  }
}
.topshow {
  margin: 15px;
  .images {
    width: 100%;
    height: 150px;
    background-size: cover;
  }
  .news-title {
    height: 42px;
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
  }
  .time {
    font-size: 12px;
    color: #ccc;
  }
}
.demo-tabs {
  .tab-title {
    margin-left: 15px;
  }
  .tab-images {
    width: 175px;
    height: 175px;
    background-size: cover;
    float: left;
  }
  .tab-time {
    margin-left: 15px;
    font-size: 12px;
    color: #ccc;
  }
}
::v-deep .el-timeline-item__content {
  height: 38px;
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
}
</style>