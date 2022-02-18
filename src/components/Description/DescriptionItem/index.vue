<!-- 描述信息项组件 -->
<template>
  <Col v-bind="spanAttrs">
    <div class="i-description-item">
      <!-- label -->
      <div class="i-description-item-label" :style="labelStyles">
        <slot v-if="$slots.label" name="label" />
        <span v-else>{{ label }}</span>
      </div>
      <!-- content -->
      <div class="i-description-item-content">
        <slot />
      </div>
    </div>
  </Col>
</template>
<script>
export default {
  name: "DescriptionItem",
  // 注入父组件的依赖
  inject: ["DescriptionInstance"],
  props: {
    // 描述信息label
    label: {
      type: String,
      default: "",
    },
  },
  computed: {
    labelStyles() {
      let styles = {};
      if (this.DescriptionInstance.labelWidth) {
        styles.width = this.DescriptionInstance.labelWidth + "px";
      }
      styles["text-align"] = this.DescriptionInstance.labelPosition;
      return styles;
    },
    // 描述信息项的栅格占位格数，0-24整数
    spanAttrs() {
      return { span: 8, ...this.$attrs };
    },
  },
};
</script>
<style lang="less" scoped>
.i-description-item {
  display: flex;
  padding: 6px 12px 6px 0;
  font-size: 14px;
  // label
  &-label {
    font-size: 14px;
    padding: 0 12px 0 0;
  }
  // content
  &-content {
    flex: 1;
  }
}
</style>
