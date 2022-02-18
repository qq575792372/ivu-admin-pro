<template>
  <div class="app-container">
    <!-- 页面标题 -->
    <PageHeader
      title="ValidSlider滑块验证码"
      content="纯前端简易版的滑块验证码组件"
    />

    <!-- main -->
    <div class="main-container">
      <!-- 基础用法 -->
      <div class="demo-block">
        <div class="demo-title">基础用法</div>
        <div class="demo-desc"></div>
        <div class="demo-use">
          <ValidSlider style="width: 360px" />
        </div>
      </div>
      <!-- 更换图标和文案 -->
      <div class="demo-block">
        <div class="demo-title">更换图标和文案</div>
        <div class="demo-desc"></div>
        <div class="demo-use">
          <ValidSlider
            start-icon="md-arrow-round-forward"
            start-text="按住别动，一直拖到最右边^_^"
            success-icon="md-checkmark"
            success-text="恭喜，验证成功"
            style="width: 360px"
          />
        </div>
      </div>
      <!-- 滑块尺寸 -->
      <div class="demo-block">
        <div class="demo-title">滑块尺寸</div>
        <div class="demo-desc">
          size的值：large，default，small，默认是default
        </div>
        <div class="demo-use">
          <ValidSlider
            size="large"
            class="margin-bottom-10"
            style="width: 360px"
          />
          <ValidSlider
            size="default"
            class="margin-bottom-10"
            style="width: 300px"
          />
          <ValidSlider
            size="small"
            class="margin-bottom-10"
            style="width: 260px"
          />
        </div>
      </div>
      <!-- 回调 -->
      <div class="demo-block">
        <div class="demo-title">回调</div>
        <div class="demo-desc">回调有on-success，on-error，on-reset</div>
        <div class="demo-use">
          <ValidSlider
            ref="slider1"
            :on-success="onSuccess"
            :on-error="onError"
            :on-reset="onReset"
            style="width: 360px"
          />
          <Button type="primary" class="margin-top-10" @click="handleReset">
            重置
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  computed: {},
  methods: {
    onSuccess() {
      this.$Message.success("回调成功");
    },
    onError() {
      this.$Message.error("回调失败");
    },
    onReset() {
      this.$Message.success("重置成功");
    },
    handleReset() {
      this.$refs.slider1.reset();
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
