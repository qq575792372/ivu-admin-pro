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
          <Link href="https://www.baidu.com" target="_blank">默认链接</Link>
          <Link type="primary">主要链接</Link>
          <Link type="success">成功链接</Link>
          <Link type="warning">警告链接</Link>
          <Link type="danger">危险链接</Link>
          <Link type="info">信息链接</Link>
        </div>
      </div>

      <!-- 文字链接大小 -->
      <div class="demo-block">
        <div class="demo-title">文字链接大小</div>
        <div class="demo-desc">size为large，small和默认</div>
        <div class="demo-use">
          <Link href="https://www.baidu.com" target="_blank">默认链接</Link>
          <Link size="large">large文字</Link>
          <Link icon="md-trash" size="large">large图标文字</Link>
          <Link size="small">small文字</Link>
          <Link icon="md-trash" size="small">small图标文字</Link>
        </div>
      </div>

      <!-- 禁用状态 -->
      <div class="demo-block">
        <div class="demo-title">禁用状态</div>
        <div class="demo-desc">文字链接禁用状态</div>
        <div class="demo-use">
          <Link target="_blank" disabled>默认链接</Link>
          <Link type="primary" disabled>主要链接</Link>
          <Link type="success" disabled>成功链接</Link>
          <Link type="warning" disabled>警告链接</Link>
          <Link type="danger" disabled>危险链接</Link>
          <Link type="info" disabled>信息链接</Link>
        </div>
      </div>

      <!-- 下划线 -->
      <div class="demo-block">
        <div class="demo-title">下划线</div>
        <div class="demo-desc">文字链接下划线</div>
        <div class="demo-use">
          <Link target="_blank" underline>默认链接</Link>
          <Link type="primary" underline>主要链接</Link>
          <Link type="success" underline>成功链接</Link>
          <Link type="warning" underline>警告链接</Link>
          <Link type="danger" underline>危险链接</Link>
          <Link type="info" underline>信息链接</Link>
        </div>
      </div>

      <!-- 图标 -->
      <div class="demo-block">
        <div class="demo-title">图标</div>
        <div class="demo-desc">文字链接使用图标</div>
        <div class="demo-use">
          <Link icon="md-add">添加</Link>
          <Link icon="md-cloud" type="primary">上传</Link>
          <Link icon="md-trash" type="danger">删除</Link>
          <Link type="warning">
            <Icon type="ios-browsers" />
            自定义slot
          </Link>
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
