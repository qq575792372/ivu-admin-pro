<template>
  <div class="app-container">
    <!-- 页面标题 -->
    <PageHeader title="成功结果" content="Result组件用法" />

    <!-- 主要内容 -->
    <div class="main-container">
      <Result
        type="success"
        title="提交成功"
        desc="预计两个小时内到账"
        extra="已提交申请，等待部门审核"
      >
        <template slot="desc">预计两个小时内到账</template>
        <div slot="extra" class="text-align-center">
          已提交申请，等待部门审核
        </div>
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
