<template>
  <div class="app-container">
    <!-- 页面标题 -->
    <PageHeader
      title="Tinymce富文本编辑器"
      content="编辑器目前有较多个比较流行的，本框架中选用Tinymce来内置到组件中。"
    />
    <div class="main-container">
      <tinymce id="tinymce1" ref="descRef" v-model="content" :height="360" />
    </div>
  </div>
</template>
<script>
// 引入富文本框组件
import Tinymce from "@/components/Tinymce";
export default {
  // 使用组件
  components: { Tinymce },
  data() {
    return {
      content: "",
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
