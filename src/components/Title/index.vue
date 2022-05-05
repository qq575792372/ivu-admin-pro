<!-- Title 标题组件 -->
<template>
  <div class="i-title" :class="{ 'i-title-show-line': showLine }">
    <!-- title -->
    <div class="i-title-text">
      <Icon v-if="icon" class="i-title-icon" :type="icon" />
      <slot v-if="$slots.title" name="title"></slot>
      <span v-else>{{ title }}</span>
    </div>
    <!-- action slot -->
    <div class="i-title-action">
      <slot v-if="$slots.action" name="action" />
    </div>
  </div>
</template>
<script>
export default {
  props: {
    // 标题内容
    title: {
      type: String,
      default: "",
    },
    // icon图标
    icon: {
      type: String,
      default: "",
    },
    // 右侧操作内容
    action: {
      type: String,
      default: "",
    },
    // 是否展示左边线条
    showLine: {
      type: Boolean,
      default: true,
    },
  },
};
</script>
<style lang="less" scoped>
.i-title {
  margin: 20px 0px 12px 0px;
  vertical-align: middle;

  // 清除浮动
  &:after {
    visibility: hidden;
    display: block;
    font-size: 0;
    content: "";
    clear: both;
    height: 0;
  }

  // 图标
  &-icon {
    float: left;
    position: relative;
    bottom: -3px;
    margin-right: 2px;
  }

  // 文字
  &-text {
    float: left;
    color: #303133;
    font-weight: bold;
    font-size: 14px;
    position: relative;
  }

  // 左侧边线
  &.i-title-show-line {
    .i-title-text {
      padding-left: 10px;
      &:before {
        content: "";
        position: absolute;
        left: 0;
        top: 25%;
        bottom: 25%;
        width: 3px;
        background: #303133;
      }
    }
  }

  // 右侧操作
  &-action {
    float: right;
    .ivu-btn {
      margin: 0 6px;
    }
  }
}
</style>
