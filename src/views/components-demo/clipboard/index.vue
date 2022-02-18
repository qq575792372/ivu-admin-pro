<template>
  <div class="app-container">
    <!-- 页面标题 -->
    <PageHeader
      title="复制文本"
      content="使用vue-clipboard2插件来实现，不再重复造轮子"
    />

    <!-- main -->
    <div class="main-container">
      <div class="demo-block">
        <div class="demo-desc">
          点击按钮复制文本框内容，然后粘贴到textarea中查看效果
        </div>
        <div class="demo-use">
          <Input
            v-model="content"
            placeholder="输入内容复制"
            style="width: 300px"
          >
            <template slot="append">
              <Button
                v-clipboard:copy="content"
                v-clipboard:success="onCopySuccess"
                v-clipboard:error="onCopyError"
                type="primary"
              >
                复制
              </Button>
            </template>
          </Input>
          <Input
            type="textarea"
            placeholder="粘贴复制的内容"
            style="width: 300px; margin-top: 20px"
            :rows="4"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      content: "ivu-admin-pro",
    };
  },
  methods: {
    onCopySuccess(e) {
      this.$Message.success("复制成功");
      console.log("复制的内容是：", e.text);
    },
    onCopyError(e) {
      this.$Message.error("复制失败");
    },
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
