<!-- Result 操作结果反馈组件 -->
<template>
  <div class="i-result">
    <!-- icon -->
    <div class="i-result-icon">
      <Icon
        v-if="type == 'success'"
        class="i-result-icon-success"
        type="ios-checkmark-circle"
      />
      <Icon
        v-if="type == 'error'"
        class="i-result-icon-error"
        type="ios-close-circle"
      />
    </div>

    <!-- title -->
    <div class="i-result-title">
      <slot v-if="$slots.title" name="title" />
      <div v-else>{{ title }}</div>
    </div>

    <!-- description slot -->
    <div class="i-result-description">
      <slot v-if="$slots.description" name="description" />
      <div v-else>{{ description }}</div>
    </div>

    <!-- extra slot -->
    <div class="i-result-extra">
      <slot v-if="$slots.extra" name="extra" />
      <div v-else>{{ extra }}</div>
    </div>

    <!-- action slot -->
    <div class="i-result-action">
      <slot v-if="$slots.action" name="action" />
    </div>
  </div>
</template>
<script>
export default {
  props: {
    type: {
      type: String,
      default: "success",
    },
    title: {
      type: String,
      default: "",
    },
    description: {
      type: String,
      default: "",
    },
    extra: {
      type: String,
      default: "",
    },
  },
};
</script>
<style lang="less" scoped>
.i-result {
  max-width: 900px;
  margin: 0 auto;
  text-align: center;

  &-icon {
    margin-bottom: 24px;
    &-success {
      font-size: 76px;
      color: #19be6b;
    }
    &-error {
      font-size: 76px;
      color: #ed4014;
    }
  }

  &-title {
    margin-bottom: 10px;
    color: #303133;
    font-weight: 500;
    font-size: 24px;
    line-height: 32px;
  }

  &-description {
    margin-bottom: 24px;
    color: #808695;
    font-size: 14px;
    line-height: 22px;
  }

  &-extra {
    padding: 24px 40px;
    text-align: left;
    background: #f8f8f9;
    border-radius: 4px;
  }

  &-action {
    margin-top: 32px;
    .ivu-btn {
      margin: 0 6px;
    }
  }
}
</style>
