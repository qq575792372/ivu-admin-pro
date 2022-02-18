<template>
  <div class="app-container">
    <!-- 页面标题 -->
    <PageHeader title="SvgIcon图标组件" content="以下展示组件用法" />

    <!-- main -->
    <div class="main-container">
      <!-- 基础用法 -->
      <div class="demo-block">
        <div class="demo-title">基础用法</div>
        <div class="demo-desc">
          设置type="user"，图标名就是src/icons/svg下面的文件名称
        </div>
        <div class="demo-use">
          <SvgIcon type="user" />
        </div>
      </div>

      <!-- 图标大小 -->
      <div class="demo-block">
        <div class="demo-title">图标大小</div>
        <div class="demo-desc">设置size="20"</div>
        <div class="demo-use">
          <SvgIcon type="user" class="margin-right-4" />
          <SvgIcon type="user" size="20" />
        </div>
      </div>

      <!-- 图标颜色 -->
      <div class="demo-block">
        <div class="demo-title">图标颜色</div>
        <div class="demo-desc">设置color颜色，支持rgba，rgb，十六进制</div>
        <div class="demo-use">
          <SvgIcon
            type="user"
            color="rgba(237,64,20,1)"
            class="margin-right-4"
          />
          <SvgIcon type="user" size="20" color="#2d8cf0" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  computed: {},
  methods: {
    handleClick() {
      alert();
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
