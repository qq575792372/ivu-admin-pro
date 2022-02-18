<!-- 描述信息组件 -->
<template>
  <div class="i-description">
    <!-- header -->
    <div class="i-description-header" :style="headerStyles">
      <!-- title and slot -->
      <div class="i-description-header-title">
        <slot v-if="$slots.title" name="title" />
        <span v-else>{{ title }}</span>
      </div>
      <!-- extra and slot -->
      <div class="i-description-header-extra">
        <slot v-if="$slots.extra" name="extra" />
        <span v-else>{{ extra }}</span>
      </div>
    </div>
    <!-- body -->
    <div class="i-description-body">
      <!-- custom slot -->
      <slot v-if="$slots.custom" name="custom" />
      <!-- DescriptionItem slot -->
      <Row v-else>
        <slot />
      </Row>
    </div>
  </div>
</template>
<script>
export default {
  name: "Description",
  // 供应子组件调用
  provide() {
    return {
      DescriptionInstance: this,
    };
  },
  props: {
    // 标题
    title: {
      type: String,
      default: "",
    },
    // label的宽度，默认80px；注入到子组件中
    labelWidth: {
      type: Number,
      default: 0,
    },
    // label的对齐方式，默认右对齐；注入到子组件中
    labelPosition: {
      type: String,
      default: "right",
    },
  },
  computed: {
    // header中有title，则添加距离底部距离
    headerStyles() {
      if (this.$slots.title || this.title) {
        return {
          "margin-bottom": "10px",
        };
      }
    },
  },
};
</script>
<style lang="less" scoped>
.i-description {
  // header
  &-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    &-title {
      color: #17233d;
      font-weight: 500;
      font-size: 16px;
    }
    &-extra {
      // has ivu-btn styles
      .ivu-btn:not(:last-child) {
        margin-right: 8px;
      }
    }
  }
  // body
  &-body {
  }
}
</style>
