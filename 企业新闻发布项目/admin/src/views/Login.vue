<template>
  <div>
    <vue-particles
      class="login-bg"
      color="#2d3a4b"
      :particleOpacity="0.7"
      :particlesNumber="80"
      shapeType="circle"
      :particleSize="4"
      linesColor="#2d3a4b"
      :linesWidth="1"
      :lineLinked="true"
      :lineOpacity="0.4"
      :linesDistance="150"
      :moveSpeed="3"
      :hoverEffect="true"
      hoverMode="grab"
      :clickEffect="true"
      clickMode="push"
    ></vue-particles>
    <div class="formContainer">
      <h1>企业登录</h1>
      <el-form
        ref="loginFormRef"
        :model="loginForm"
        status-icon
        :rules="loginRules"
        label-width="80px"
        class="demo-ruleForm"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="loginForm.username" autocomplete="off" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            v-model="loginForm.password"
            type="password"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
// 引入axios
import axios from "axios";
import { ElMessage } from "element-plus";
import { useStore } from "vuex";
export default {
  name: "Login",
  setup() {
    const store = useStore();
    const router = useRouter();
    const loginFormRef = ref(); //表单的引用对象
    const loginForm = reactive({
      username: "",
      password: "",
    }); //表单的数据对象
    const loginRules = reactive({
      username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
      password: [{ required: true, message: "请输入密码", trigger: "blur" }],
    }); //表单的校验

    function submitForm() {
      // 再次手动验证表单，防止用户没有输入内容触发事件直接点击提交按钮
      loginFormRef.value.validate((value) => {
        if (value) {
          // 尝试和后端进行交互
          axios.post("/adminapi/user/login", loginForm).then((res) => {
            if (res.data.ActionType === "OK") {
              // 将用户数据保存到vuex中
              store.commit("addUserInfo", res.data.userInfoData);
              store.commit("changeGetAllRoute", false);
              //输入内容后，value为真则进行操作
              // useRouter的作用相当于$router，进行编程式路由
              router.push("/index");
            } else {
              ElMessage.error("用户名或密码错误.");
            }
          });
        }
      });
    }
    return {
      loginFormRef,
      loginForm,
      loginRules,
      submitForm,
    };
  },
};
</script>

<style lang="less" scoped>
.login-bg {
  background: skyblue;
}
.formContainer {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 500px;
  height: 300px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  text-align: center;
  border-radius: 15px;
  ::v-deep .el-form-item__label {
    color: white;
  }
  h1 {
    font-size: 45px;
    margin-bottom: 15px;
  }
  .demo-ruleForm {
    width: 450px;
  }
  ::v-deep .el-form-item__content {
    justify-content: center;
  }
}
</style>