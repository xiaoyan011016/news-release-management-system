<template>
  <el-upload
    class="avatar-uploader"
    action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
    :show-file-list="false"
    :auto-upload="false"
    :on-change="handleChangeAvatar"
  >
    <img v-if="avatar" :src="avatarUpload" class="avatar" />
    <el-icon v-else class="avatar-uploader-icon">
      <Plus />
    </el-icon>
  </el-upload>
</template>

<script>
import { computed } from "vue";
import { Plus } from "@element-plus/icons-vue";
export default {
  name: "Upload",
  components: { Plus },
  props: ["avatar"],
  emit: ["handleChangeAvatar"],
  setup(props, ctx) {
    // 显示文件上传图片的头像
    const avatarUpload = computed(() => {
      return props.avatar.includes("blob")
        ? props.avatar
        : "http://localhost:3000" + props.avatar;
    });
    // 处理头像上传文件改变的时候函数，将上传的文件显示在框内
    const handleChangeAvatar = (file) => {
      // 触发事件，传递参数
      ctx.emit("handleChangeAvatar", file.raw);
    };
    return { handleChangeAvatar, avatarUpload };
  },
};
</script>

<style lang="less" scoped>
::v-deep.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

::v-deep.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

::v-deep.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
}
</style>