<template>
  <el-page-header title="产品管理" icon="">
    <template #content>
      <span class="text-large font-600 mr-3"> 添加产品 </span>
    </template>
  </el-page-header>
  <el-form
    ref="productFormRef"
    :model="productForm"
    :rules="productRules"
    label-width="120px"
    class="demo-ruleForm"
  >
    <el-form-item label="标题" prop="title">
      <el-input v-model="productForm.title" />
    </el-form-item>
    <el-form-item label="产品介绍" prop="introduction">
      <el-input
        resize="none"
        type="textarea"
        :rows="5"
        v-model="productForm.introduction"
      />
    </el-form-item>
    <el-form-item label="产品细节" prop="detail">
      <el-input
        resize="none"
        type="textarea"
        :rows="5"
        v-model="productForm.detail"
      />
    </el-form-item>
    <el-form-item label="封面" prop="cover">
      <!-- 封装upload上传组件 -->
      <Upload
        :avatar="productForm.cover"
        @handleChangeAvatar="handleChangeAvatar"
      ></Upload>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">添加新闻</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import upload from "@/util/upload";
import Upload from "@/components/uoload/Upload.vue";
import { ref, reactive, computed } from "vue";
import { useRouter } from "vue-router";
export default {
  name: "ProductAdd",
  components: { Upload },
  setup() {
    const router = useRouter();
    const productFormRef = ref();
    const productForm = reactive({
      title: "",
      introduction: "",
      detail: "",
      cover: "",
      file: null,
    });
    const productRules = reactive({
      title: [{ required: true, message: "请输入标题", trigger: "blur" }],
      introduction: [
        { required: true, message: "请输入产品介绍", trigger: "blur" },
      ],
      detail: [{ required: true, message: "请输入细节描述", trigger: "blur" }],
      cover: [{ required: true, message: "请选择封面", trigger: "blur" }],
    });
    const handleChangeAvatar = (file) => {
      productForm.cover = URL.createObjectURL(file);
      productForm.file = file; //转存原生文件信息
    };
    const onSubmit = () => {
      productFormRef.value.validate(async (value) => {
        if (value) {
          await upload("/adminapi/product/add", productForm);
          router.push("/product-manage/productlist");
        }
      });
    };
    return {
      productFormRef,
      productForm,
      productRules,
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