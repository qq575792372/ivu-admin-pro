<template>
  <div class="app-container">
    <!-- 页面标题 -->
    <PageHeader title="Title标题" />

    <!-- main -->
    <div class="main-container">
      <!-- 基础用法 -->
      <div class="demo-block">
        <div class="demo-title">基础用法</div>
        <div class="demo-desc"></div>
        <div class="demo-use">
          <Title title="用户信息" />
          <div>内容</div>

          <Title title="等级信息" />
          <div>内容</div>
        </div>
      </div>

      <!-- 不带左侧边线 -->
      <div class="demo-block">
        <div class="demo-title">不带左侧边线</div>
        <div class="demo-desc"></div>
        <div class="demo-use">
          <Title title="用户信息" :show-line="false" />
          <div>内容</div>

          <Title title="等级信息" :show-line="false" />
          <div>内容</div>
        </div>
      </div>

      <!-- 标题图标 -->
      <div class="demo-block">
        <div class="demo-title">标题图标</div>
        <div class="demo-desc"></div>
        <div class="demo-use">
          <Title title="用户信息" icon="md-person" />
          <div>带左侧边线的标题图标</div>

          <Title title="等级信息" :show-line="false" icon="md-heart" />
          <div>内容</div>
        </div>
      </div>

      <!-- 插槽用法 -->
      <div class="demo-block">
        <div class="demo-title">插槽用法</div>
        <div class="demo-desc"></div>
        <div class="demo-use">
          <Title>
            <template slot="title">用户信息</template>
            <template slot="action">
              <Button type="primary" size="small">编辑</Button>
              <Button type="danger" size="small">禁用</Button>
            </template>
          </Title>
          <Title>
            <template slot="title">等级信息</template>
            <template slot="action">
              <Button type="primary" size="small">编辑</Button>
              <Button type="danger" size="small">禁用</Button>
            </template>
          </Title>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  computed: {},
  methods: {},
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
