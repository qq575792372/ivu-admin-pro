<template>
  <div class="app-container">
    <!-- 页面标题 -->
    <PageHeader title="Link文字链接" content="文字超链接用法" />

    <!-- main -->
    <div class="main-container">
      <!-- 基础用法 -->
      <div class="demo-block">
        <div class="demo-title">基础用法</div>
        <div class="demo-desc">基础的文字链接用法</div>
        <div class="demo-use">
          <i-link href="https://www.baidu.com" target="_blank">默认链接</i-link>
          <i-link type="primary">主要链接</i-link>
          <i-link type="success">成功链接</i-link>
          <i-link type="warning">警告链接</i-link>
          <i-link type="danger">危险链接</i-link>
          <i-link type="info">信息链接</i-link>
        </div>
      </div>

      <!-- 文字链接大小 -->
      <div class="demo-block">
        <div class="demo-title">文字链接大小</div>
        <div class="demo-desc">size为large，small和默认</div>
        <div class="demo-use">
          <i-link href="https://www.baidu.com" target="_blank">默认链接</i-link>
          <i-link size="large">large文字</i-link>
          <i-link icon="md-trash" size="large">large图标文字</i-link>
          <i-link size="small">small文字</i-link>
          <i-link icon="md-trash" size="small">small图标文字</i-link>
        </div>
      </div>

      <!-- 禁用状态 -->
      <div class="demo-block">
        <div class="demo-title">禁用状态</div>
        <div class="demo-desc">文字链接禁用状态</div>
        <div class="demo-use">
          <i-link target="_blank" disabled>默认链接</i-link>
          <i-link type="primary" disabled>主要链接</i-link>
          <i-link type="success" disabled>成功链接</i-link>
          <i-link type="warning" disabled>警告链接</i-link>
          <i-link type="danger" disabled>危险链接</i-link>
          <i-link type="info" disabled>信息链接</i-link>
        </div>
      </div>

      <!-- 下划线 -->
      <div class="demo-block">
        <div class="demo-title">下划线</div>
        <div class="demo-desc">文字链接无划线</div>
        <div class="demo-use">
          <i-link target="_blank" :underline="false">默认链接</i-link>
          <i-link type="primary" :underline="false">主要链接</i-link>
          <i-link type="success" :underline="false">成功链接</i-link>
          <i-link type="warning" :underline="false">警告链接</i-link>
          <i-link type="danger" :underline="false">危险链接</i-link>
          <i-link type="info" :underline="false">信息链接</i-link>
        </div>
      </div>

      <!-- 图标 -->
      <div class="demo-block">
        <div class="demo-title">图标</div>
        <div class="demo-desc">文字链接使用图标</div>
        <div class="demo-use">
          <i-link icon="md-add" :underline="false">添加</i-link>
          <i-link icon="md-cloud" type="primary" :underline="false">
            上传
          </i-link>
          <i-link icon="md-trash" type="danger" :underline="false">删除</i-link>
          <i-link type="warning" :underline="false">
            <Icon type="ios-browsers" />
            自定义slot
          </i-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {};
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
