<template>
  <div>
    <el-page-header icon="" title="用户管理">
      <template #content>
        <span class="text-large font-600 mr-3"> 用户列表 </span>
      </template>
    </el-page-header>
    <el-card>
      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column prop="username" label="用户名" />
        <el-table-column label="头像">
          <template #default="scope">
            <div v-if="scope.row.avatar">
              <el-avatar
                :size="50"
                :src="'http://localhost:3000' + scope.row.avatar"
              />
            </div>
            <div v-else>
              <el-avatar
                :size="50"
                src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
              />
            </div>
          </template>
        </el-table-column>
        <el-table-column label="角色">
          <template #default="scope">
            <el-tag v-if="scope.row.role === 2" class="ml-2" type="success"
              >编辑</el-tag
            >
            <el-tag v-else class="ml-2" type="danger">管理员</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template #default="scope">
            <el-button size="small" @click="handleEdit(scope.$index, scope.row)"
              >编辑</el-button
            >
            <el-popconfirm
              title="确定删除吗？"
              confirm-button-text="确定"
              cancel-button-text="取消"
              @confirm="handleDelete(scope.$index, scope.row)"
            >
              <template #reference>
                <el-button size="small" type="danger">删除</el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog v-model="dialogVisible" title="编辑弹窗" width="30%">
        <el-form
          ref="userFormRef"
          :model="userForm"
          :rules="userRules"
          label-width="120px"
          class="demo-ruleForm"
        >
          <el-form-item label="用户名" prop="username">
            <el-input v-model="userForm.username" />
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="userForm.password" />
          </el-form-item>
          <el-form-item label="角色" prop="role">
            <el-select v-model="userForm.role" style="width: 100%">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="个人简介" prop="introduction">
            <el-input
              resize="none"
              type="textarea"
              :rows="5"
              v-model="userForm.introduction"
            />
          </el-form-item>
        </el-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="dialogVisible = false">取消</el-button>
            <el-button type="primary" @click="handleEditConfirm">
              确定
            </el-button>
          </span>
        </template>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import { ElMessage } from "element-plus";
import { onMounted, ref, reactive } from "vue";
import axios from "axios";
export default {
  name: "UserList",
  setup() {
    let tableData = ref([]);
    // 修改弹窗的显示和隐藏位
    let dialogVisible = ref(false);

    const getTableData = async () => {
      const res = await axios.get("/adminapi/user/list");
      tableData.value = res.data.data;
    };
    // 处理编辑
    const handleEdit = async (index, row) => {
      // 可以再次封装获取需要的数据
      const result = await axios.get(`/adminapi/user/list/${row._id}`);
      Object.assign(userForm, ...result.data.data);
      console.log(result.data.data);
      dialogVisible.value = true;
    };
    const handleDelete = async (index, row) => {
      await axios.delete(`/adminapi/user/list/${row._id}`);
      // 每次删除后更新当前页面即可
      getTableData();
      // 放置删除成功消息反馈
      ElMessage({
        message: "删除成功.",
        type: "success",
      });
    };
    // 表单处理
    const userFormRef = ref();
    const userForm = reactive({
      username: "",
      password: "",
      role: 2, //1管理员 2编辑
      introduction: "",
    });
    const userRules = reactive({
      username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
      password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      role: [{ required: true, message: "请选择角色", trigger: "blur" }],
      introduction: [
        { required: true, message: "请编辑个人简介", trigger: "blur" },
      ],
    });
    const options = [
      { label: "管理员", value: 1 },
      { label: "编辑", value: 2 },
    ];
    const handleEditConfirm = () => {
      // 验证表单数据是否通过
      userFormRef.value.validate(async (value) => {
        if (value) {
          // 发送修改的数据取后台更新
          await axios.put(`/adminapi/user/list/${userForm._id}`, userForm);
          // 将窗口设置为不可见
          dialogVisible.value = false;
          // 更新最新的数据列表
          getTableData();
        }
      });
    };
    onMounted(() => {
      // 发送请求获取数据
      getTableData();
    });
    return {
      dialogVisible,
      tableData,
      handleEdit,
      handleDelete,
      userFormRef,
      userForm,
      userRules,
      options,
      handleEditConfirm,
    };
  },
};
</script>

<style lan="less" scoped>
.el-card {
  margin-top: 20px;
}
</style>