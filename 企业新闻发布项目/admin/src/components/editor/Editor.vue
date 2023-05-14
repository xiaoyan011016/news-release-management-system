<template>
  <div id="editor"></div>
</template>

<script>
import { onMounted, onUpdated } from "vue";
import E from "wangeditor";
export default {
  name: "Editor",
  emit: ["handleEditorEvent"],
  props: ["content"],
  setup(props, ctx) {
    onMounted(() => {
      const editor = new E("#editor");
      editor.create();
      // 配置 onchange 回调函数
      editor.config.onchange = function (newHtml) {
        ctx.emit("handleEditorEvent", newHtml);
      };
      // 设置初始值
      props.content && editor.txt.html(props.content);
    });
    return {};
  },
};
</script>

<style>
</style>