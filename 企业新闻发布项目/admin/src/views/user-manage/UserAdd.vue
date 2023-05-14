<template>
  <el-page-header title="用户管理" icon="">
    <template #content>
      <span class="text-large font-600 mr-3"> 添加用户 </span>
    </template>
  </el-page-header>
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
      <el-button type="primary" @click="onSubmit">添加用户</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import upload from "@/util/upload";
import Upload from "@/components/uoload/Upload.vue";
import { ref, reactive, computed } from "vue";
import { useRouter } from "vue-router";
export default {
  name: "UserAdd",
  components: { Upload },
  setup() {
    const router = useRouter();
    const userFormRef = ref();
    const userForm = reactive({
      username: "",
      password: "",
      role: 2, //1管理员 2编辑
      introduction: "",
      avatar: "",
      file: null,
      gender: 0,
    });
    const userRules = reactive({
      username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
      password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      role: [{ required: true, message: "请选择角色", trigger: "blur" }],
      introduction: [
        { required: true, message: "请编辑个人简介", trigger: "blur" },
      ],
      avatar: [{ required: true, message: "请选择头像", trigger: "blur" }],
    });
    const options = [
      { label: "管理员", value: 1 },
      { label: "编辑", value: 2 },
    ];
    const handleChangeAvatar = (file) => {
      userForm.avatar = URL.createObjectURL(file);
      userForm.file = file; //转存原生文件信息
    };
    const onSubmit = () => {
      userFormRef.value.validate(async (value) => {
        if (value) {
          // 发送ajax请求
          await upload("/adminapi/user/add", userForm);
          // 添加成功跳转
          router.push("/user-manage/userlist");
        }
      });
    };
    return {
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
.el-form {
  margin-top: 20px;
}
</style>