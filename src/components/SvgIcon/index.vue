<!-- Svg图标组件 -->
<template>
  <svg
    class="svg-icon"
    :style="iconStyles"
    aria-hidden="true"
    v-on="$listeners"
  >
    <use :xlink:href="iconName" />
  </svg>
</template>
<script>
export default {
  name: "SvgIcon",
  props: {
    // 图标名称
    type: {
      type: String,
      default: "",
    },
    // 图标大小
    size: {
      type: [Number, String],
      default: 14,
    },
    // 图标颜色
    color: {
      type: String,
      default: "currentColor",
    },
  },
  computed: {
    // 图标名称，必须格式是 #svg-icon-[name] ，要和vue.config.js中的配置保持一致
    iconName() {
      return `#svg-icon-${this.type}`;
    },
    // 图标样式
    iconStyles() {
      return {
        "font-size": this.size,
        fill: this.color,
      };
    },
  },
};
</script>

<style lang="less" scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.16em;
  /* fill: currentColor; */
  overflow: hidden;
}

.svg-external-icon {
  background-color: currentColor;
  mask-size: cover !important;
  display: inline-block;
}
</style>
