<template>
  <div class="app-container">
    <!-- 页面标题 -->
    <PageHeader title="滚动条" content="滚动条组件用法" />

    <!-- main -->
    <div class="main-container">
      <div class="demo-block">
        <div class="demo-desc">
          高度超出后出现滚动条，需要最外层设置固定高度
        </div>
        <div class="demo-use">
          <!-- 滚动条组件用法，需要最外层设置固定高度 -->
          <div style="height: 300px">
            <vue-scrollbar>
              <div
                v-for="(item, index) in 50"
                :key="index"
                style="padding: 10px; border: solid 1px #ddd"
              >
                {{ item }}
              </div>
            </vue-scrollbar>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  computed: {},
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
