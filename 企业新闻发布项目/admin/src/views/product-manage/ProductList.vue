<template>
  <div>
    <el-page-header icon="" title="产品管理">
      <template #content>
        <span class="text-large font-600 mr-3"> 产品列表 </span>
      </template>
    </el-page-header>
    <el-card>
      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column prop="title" label="产品名称" />
        <el-table-column prop="introduction" label="简要描述" />

        <el-table-column label="更新时间">
          <template #default="scope">
            {{ formatTime.formatCditTime(scope.row.editTime) }}
          </template>
        </el-table-column>

        <el-table-column label="操作">
          <template #default="scope">
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
  </div>
</template>

<script>
import { Delete, Edit } from "@element-plus/icons-vue";
import { ref, onMounted } from "vue";
import axios from "axios";
import formatTime from "@/util/formatTime";
import { ElMessage } from "element-plus";
import { useRouter } from "vue-router";
export default {
  name: "ProductList",
  components: { Delete, Edit },
  setup() {
    const router = useRouter();
    // 表格数据
    const tableData = ref([]);

    onMounted(async () => {
      getTableList();
    });
    const getTableList = async () => {
      const res = await axios.get("/adminapi/product/list");
      tableData.value = res.data.data;
    };

    // 新闻编辑
    const handleEdit = (item) => {
      router.push(`/product-manage/productEdit/${item._id}`);
    };

    // 删除确认回调
    const handleDelete = async (item) => {
      await axios.delete(`/adminapi/product/list/${item._id}`);
      await getTableList();
    };

    return {
      tableData,
      formatTime,
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