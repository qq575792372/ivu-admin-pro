<template>
  <div
    id="i-layout-navbar-fullscreen"
    class="i-layout-navbar-fullscreen"
    @click="toggleClick"
  >
    <Icon v-show="isFullscreen" class="i-icon" type="md-contract" />
    <Icon v-show="!isFullscreen" class="i-icon" type="md-expand" />
  </div>
</template>
<script>
import screenfull from "screenfull";
export default {
  name: "Fullscreen",
  data() {
    return {
      isFullscreen: false,
    };
  },
  mounted() {
    this.init();
  },
  beforeDestroy() {
    this.destroy();
  },
  methods: {
    init() {
      if (screenfull.isEnabled) {
        screenfull.on("change", this.change);
      }
    },
    toggleClick() {
      if (!screenfull.isEnabled) {
        this.$message({ message: "你的浏览器不支持全屏", type: "warning" });
        return false;
      }
      screenfull.toggle();
    },
    change() {
      this.isFullscreen = screenfull.isFullscreen;
    },
    destroy() {
      if (screenfull.isEnabled) {
        screenfull.off("change", this.change);
      }
    },
  },
};
</script>
<style lang="less" scoped>
.i-layout-navbar-fullscreen {
  display: inline-block;
  cursor: pointer;
  line-height: 60px;
  color: #515a6e;
  padding: 0px 12px;

  .i-icon {
    font-size: 18px;
  }
}
</style>
