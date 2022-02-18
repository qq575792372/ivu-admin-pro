<template>
  <div class="app-container">
    <!-- 页面标题 -->
    <PageHeader title="JSON编辑器" content="使用JSONEditor" />
    <div class="main-container">
      <JsonEditor ref="jsonEditorRef" v-model="content" />
    </div>
  </div>
</template>
<script>
// 引入JSON编辑器组件
import JsonEditor from "@/components/JsonEditor";
export default {
  // 使用组件
  components: { JsonEditor },
  data() {
    return {
      content: [
        { id: 1, name: "张三" },
        { id: 2, name: "小明" },
        { id: 3, name: "小花" },
      ],
    };
  },
};
</script>

<style lang="less" scoped>
.app-container {
  .main-container {
    background: #fff;
    margin: 16px;
    padding: 16px;
    border-radius: 4px;
  }
}
</style>
