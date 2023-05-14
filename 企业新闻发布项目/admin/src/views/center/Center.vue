<template>
  <div>
    <el-page-header title="企业门户管理系统" icon="">
      <template #content>
        <span class="text-large font-600 mr-3"> 个人中心 </span>
      </template>
    </el-page-header>

    <el-row :gutter="30">
      <el-col :span="8" class="el-col-left">
        <el-card class="box-card">
          <el-avatar :size="100" :src="avatarUpload" />
          <h3>{{ username }}</h3>
          <h3>{{ role }}</h3>
        </el-card>
      </el-col>

      <el-col :span="16"
        ><el-card class="box-card">
          <template #header>
            <div class="card-header">
              <span>个人信息</span>
            </div>
          </template>
          <!-- 表单区域 -->
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

            <el-form-item label="性别" prop="gender">
              <el-select v-model="userForm.gender" style="width: 100%">
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
                :rows="10"
                v-model="userForm.introduction"
              />
            </el-form-item>

            <el-form-item label="头像" prop="avatar">
              <!-- 封装upload上传组件 -->
              <Upload
                :avatar="userForm.avatar"
                @handleChangeAvatar="handleChangeAvatar"
              ></Upload>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">更新</el-button>
            </el-form-item>
          </el-form>
        </el-card></el-col
      >
    </el-row>
  </div>
</template>

<script>
import { ElMessage } from "element-plus";
import { useStore } from "vuex";
import { computed, ref, reactive } from "vue";
import upload from "../../util/upload.js";
import Upload from "@/components/uoload/Upload.vue";
export default {
  name: "Center",
  components: { Upload },
  setup() {
    const store = useStore();

    const avatarUpload = computed(() => {
      return store.state.userInfo.avatar
        ? "http://localhost:3000" + store.state.userInfo.avatar
        : "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png";
    });

    const role = computed(() =>
      store.state.userInfo.role === 1 ? "管理员" : "编辑"
    );
    // 创建表单相关的数据
    // 结构store中的数据
    const { username, gender, introduction, avatar } = store.state.userInfo;

    const userFormRef = ref();
    const userForm = reactive({
      username,
      gender,
      introduction,
      avatar,
      file: null,
    });
    const userRules = reactive({
      username: [
        {
          required: true,
          message: "请输入用户名",
          trigger: "blur",
        },
      ],
      gender: [
        {
          required: true,
          message: "请输入性别",
          trigger: "blur",
        },
      ],
      introduction: [
        {
          required: true,
          message: "请输入自我介绍",
          trigger: "blur",
        },
      ],
      avatar: [
        {
          required: true,
          trigger: "blur",
        },
      ],
    });
    const options = [
      { label: "保密", value: 0 },
      { label: "男", value: 1 },
      { label: "女", value: 2 },
    ];
    // 处理头像上传文件改变的时候函数，将上传的文件显示在框内
    const handleChangeAvatar = (file) => {
      userForm.avatar = URL.createObjectURL(file);
      userForm.file = file; //转存原生文件信息
    };

    // 提交表单需要将表单信息提交到服务器
    const onSubmit = () => {
      // 所有表单验证通过
      userFormRef.value.validate(async (value) => {
        if (value) {
          let res = await upload("/adminapi/user/upload", userForm);
          store.commit("addUserInfo", res.data);
          ElMessage({
            message: "修改成功.",
            type: "success",
          });
        } else {
          ElMessage.error("请重新操作.");
        }
      });
    };
    return {
      avatarUpload,
      username,
      role,
      userFormRef,
      userForm,
      userRules,
      options,
      handleChangeAvatar,
      onSubmit,
    };
  },
};
</script>

<style lang="less" scoped>
.el-row {
  margin-top: 20px;
}
.el-col-left {
  text-align: center;
}
</style>