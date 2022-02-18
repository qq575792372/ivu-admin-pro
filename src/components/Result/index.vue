<!-- 操作结果反馈组件 -->
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
        v-if="type == 'fail'"
        class="i-result-icon-fail"
        type="ios-close-circle"
      />
    </div>
    <!-- title -->
    <div v-if="title" class="i-result-title">{{ title }}</div>
    <!-- desc slot -->
    <div class="i-result-desc">
      <slot v-if="$slots.desc" name="desc" />
      <div v-else>{{ desc }}</div>
    </div>
    <!-- extra slot -->
    <div class="i-result-extra">
      <slot v-if="$slots.extra" name="extra" />
      <div v-else>{{ extra }}</div>
    </div>
    <!-- actions slot -->
    <div class="i-result-actions">
      <slot v-if="$slots.actions" name="actions" />
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
    desc: {
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
    &-fail {
      font-size: 76px;
      color: #ed4014;
    }
  }

  &-title {
    margin-bottom: 10px;
    color: #17233d;
    font-weight: 500;
    font-size: 24px;
    line-height: 32px;
  }

  &-desc {
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

  &-actions {
    margin-top: 32px;
    .ivu-btn {
      margin: 0 6px;
    }
  }
}
</style>
