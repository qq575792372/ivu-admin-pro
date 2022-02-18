<template>
  <div class="app-container">
    <!-- 页面标题 -->
    <PageHeader title="页头" content="页头组件用法" />

    <!-- main -->
    <div class="main-container">
      <!-- 组件结构 -->
      <div class="demo-block">
        <div class="demo-title">基础结构</div>
        <div class="demo-desc">组件的布局结构</div>
        <div class="demo-use">
          <PageHeader class="demo-page-header">
            <div slot="logo" class="demo-logo">
              <img src="../../../assets/logo.png" />
            </div>
            <div slot="title" class="demo-title">标题（支持slot方式）</div>
            <div slot="subtitle" class="demo-subtitle">
              副标题（支持slot方式）
            </div>
            <div slot="actions" class="demo-actions">
              操作按钮（仅slot方式）
            </div>
            <div slot="content" class="demo-content">内容（支持slot方式）</div>
            <div slot="extra" class="demo-extra">附加内容（支持slot方式）</div>
          </PageHeader>
        </div>
      </div>

      <!-- 基础用法 -->
      <div class="demo-block">
        <div class="demo-title">基础用法</div>
        <div class="demo-desc"></div>
        <div class="demo-use">
          <PageHeader title="页头标题" content="内容描述" extra="附加内容" />
        </div>
      </div>

      <!-- 自定义slot方式 -->
      <div class="demo-block">
        <div class="demo-title">自定义slot方式</div>
        <div class="demo-desc">props和slot方式结合用法</div>
        <div class="demo-use">
          <PageHeader title="页头标题" content="内容描述" extra="附加内容">
            <template slot="actions">
              <ButtonGroup class="margin-right-8">
                <Button type="default">操作1</Button>
                <Button type="default">操作2</Button>
              </ButtonGroup>
              <Button type="primary">编辑</Button>
            </template>
          </PageHeader>
        </div>
      </div>

      <!-- 返回按钮 -->
      <div class="demo-block">
        <div class="demo-title">返回按钮</div>
        <div class="demo-desc">带返回按钮效果，可以设置@on-back回调函数</div>
        <div class="demo-use">
          <PageHeader back title="页头标题" @on-back="goback" />
          <PageHeader back="返回列表" @on-back="goback" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  computed: {},
  methods: {
    goback() {
      this.$Message.info("点击返回按钮的回调");
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

// 示例中page-header组件结构背景
.demo-page-header {
  .demo-title {
    background: #40a9ff;
  }
  .demo-logo,
  .demo-actions,
  .demo-content,
  .demo-extra {
    background: #69c0ff;
  }
}
</style>
