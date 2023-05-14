<template>
  <div>
    <el-page-header icon="" title="新闻管理">
      <template #content>
        <span class="text-large font-600 mr-3"> 新闻列表 </span>
      </template>
    </el-page-header>
    <el-card>
      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column prop="title" label="标题" />
        <el-table-column label="分类">
          <template #default="scope">
            {{ formatCategory(scope.row.category) }}
          </template>
        </el-table-column>
        <el-table-column label="更新时间">
          <template #default="scope">
            {{ formatTime.formatCditTime(scope.row.editTime) }}
          </template>
        </el-table-column>
        <el-table-column label="是否发布">
          <template #default="scope">
            <el-switch
              v-model="scope.row.isPublish"
              :active-value="1"
              :inactive-value="0"
              @change="handleIsPublish(scope.row)"
          /></template>
        </el-table-column>
        <el-table-column label="操作">
          <template #default="scope">
            <el-button
              size="small"
              circle
              type="success"
              @click="handlePreview(scope.row)"
            >
              <el-icon>
                <Star></Star>
              </el-icon>
            </el-button>
            <el-button size="small" circle @click="handleEdit(scope.row)">
              <el-icon>
                <Edit></Edit>
              </el-icon>
            </el-button>
            <el-popconfirm
              title="确定删吗?"
              confirm-button-text="确定"
              cancel-button-text="删除"
              @confirm="handleDelete(scope.row)"
            >
              <template #reference>
                <el-button size="small" circle type="danger">
                  <el-icon>
                    <Delete></Delete>
                  </el-icon>
                </el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 弹窗显示组件 -->
    <el-dialog v-model="dialogVisible" title="编辑预览" width="45%">
      <h1>{{ previewDate.title }}</h1>
      <h5 style="color: #ccc">
        {{ formatTime.formatCditTime(previewDate.editTime) }}
      </h5>
      <el-divider>
        <el-icon><star-filled /></el-icon>
      </el-divider>
      <div v-html="previewDate.content" class="haveImg"></div>
    </el-dialog>
  </div>
</template>

<script>
import { Delete, Edit, Star, StarFilled } from "@element-plus/icons-vue";
import { ref, onMounted } from "vue";
import axios from "axios";
import formatTime from "@/util/formatTime";
import { ElMessage } from "element-plus";
import { useRouter } from "vue-router";
export default {
  name: "NewsList",
  components: { Delete, Edit, Star, StarFilled },
  setup() {
    const router = useRouter();
    // 表格数据
    const tableData = ref([]);
    // 预览数据,采用ref解决对象赋值的问题
    const previewDate = ref({});
    //弹窗状态控制变量
    const dialogVisible = ref(false);
    onMounted(async () => {
      getTableList();
    });
    const getTableList = async () => {
      const res = await axios.get("/adminapi/news/list");
      tableData.value = res.data.data;
    };
    // 格式化种类
    const formatCategory = (category) => {
      const arr = ["最新动态", "典型案例", "通知公告"];
      return arr[category - 1];
    };
    // 新闻发布回调
    const handleIsPublish = async (item) => {
      await axios.put(`/adminapi/news/publish/${item._id}`, {
        isPublish: item.isPublish,
      });
      // 重新更新
      getTableList();
      ElMessage({
        message: "修改成功.",
        type: "success",
      });
    };
    // 预览回调
    const handlePreview = (item) => {
      previewDate.value = item;
      dialogVisible.value = true;
    };

    // 新闻编辑
    const handleEdit = (item) => {
      router.push(`/news-manager/editnews/${item._id}`);
    };

    // 删除确认回调
    const handleDelete = async (item) => {
      await axios.delete(`/adminapi/news/list/${item._id}`);
      getTableList();
    };
    return {
      dialogVisible,
      tableData,
      formatCategory,
      formatTime,
      handleIsPublish,
      handlePreview,
      previewDate,
      handleDelete,
      handleEdit,
    };
  },
};
</script>

<style lang="less" scoped>
.el-card {
  margin-top: 20px;
}
::v-deep .haveImg img {
  max-width: 100%;
}
</style>