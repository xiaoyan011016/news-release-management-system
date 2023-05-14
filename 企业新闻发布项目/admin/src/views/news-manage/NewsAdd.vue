<template>
  <div>
    <el-page-header icon="" title="新闻管理">
      <template #content>
        <span class="text-large font-600 mr-3"> 添加新闻 </span>
      </template>
    </el-page-header>
    <el-form
      ref="newsFormRef"
      :model="newsForm"
      :rules="newsRules"
      label-width="120px"
      class="demo-ruleForm"
    >
      <el-form-item label="标题" prop="title">
        <el-input v-model="newsForm.title" />
      </el-form-item>
      <el-form-item label="内容" prop="content">
        <!-- 富文本编辑 -->
        <Editor @handleEditorEvent="handleEditorEvent"></Editor>
      </el-form-item>
      <el-form-item label="新闻种类" prop="category">
        <el-select v-model="newsForm.category" class="m-2" style="width: 100%">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="封面图片" prop="cover">
        <Upload
          :avatar="newsForm.cover"
          @handleChangeAvatar="handleChangeCover"
        ></Upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm"> 添加新闻 </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import Upload from "@/components/uoload/Upload.vue";
import { ref, reactive } from "vue";
// 引入富文本编辑钻进
import Editor from "@/components/editor/Editor.vue";
import upload from "../../util/upload";
import { useRouter } from "vue-router";
export default {
  name: "NewsAdd",
  components: { Editor, Upload },
  setup() {
    const router = useRouter();
    // 定义表单的内容
    const newsFormRef = ref();
    const newsForm = reactive({
      title: "", //标题
      content: "", //内容
      category: 1, //新闻的种类 1最新动态 2典型案例 3 通知公告
      cover: "", //图片
      file: null,
      isPublish: 0, //发布标志位
    });
    const newsRules = reactive({
      title: [{ required: true, message: "请输入标题", trigger: "blur" }],
      content: [{ required: true, message: "请输入内容", trigger: "blur" }],
      category: [{ required: true, message: "请输入类别", trigger: "blur" }],
      cover: [{ required: true, message: "请上传头像", trigger: "blur" }],
    });
    const options = [
      { label: "最新动态", value: 1 },
      { label: "典型案例", value: 2 },
      { label: "通知公告", value: 3 },
    ];
    // 富文本编辑的自定义事件
    const handleEditorEvent = (value) => {
      newsForm.content = value;
    };
    const handleChangeCover = (file) => {
      newsForm.cover = URL.createObjectURL(file);
      newsForm.file = file;
    };
    const submitForm = () => {
      newsFormRef.value.validate(async (value) => {
        if (value) {
          await upload("/adminapi/news/add", newsForm);
          router.push("/news-manage/newslist");
        }
      });
    };
    return {
      newsFormRef,
      newsForm,
      newsRules,
      handleEditorEvent,
      options,
      handleChangeCover,
      submitForm,
    };
  },
};
</script>

<style lang="less" scoped>
.el-form {
  margin-top: 20px;
}
</style>