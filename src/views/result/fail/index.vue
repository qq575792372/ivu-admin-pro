<template>
  <div class="app-container">
    <!-- 页面标题 -->
    <PageHeader title="成功结果" content="Result组件用法" />

    <!-- 主要内容 -->
    <div class="main-container">
      <Result type="fail" title="提交失败">
        <template slot="desc">请核对并修改以下信息后，再重新提交</template>
        <template slot="extra">
          <div>1.重新检查信息</div>
          <div>2.再次尝试提交</div>
        </template>
        <div slot="actions">
          <Button type="primary">主要操作</Button>
          <Button type="default">次要操作</Button>
          <Button type="error">警告操作</Button>
        </div>
      </Result>
    </div>
  </div>
</template>
<style lang="less" scoped>
.app-container {
  .main-container {
    background: #fff;
    margin: 16px;
    padding: 30px;
    border-radius: 4px;
    .form-box {
      width: 640px;
      margin: 0 auto;
    }
  }
}
</style>
