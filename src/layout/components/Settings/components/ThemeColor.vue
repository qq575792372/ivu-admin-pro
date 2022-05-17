<template>
  <div class="theme-color-container">
    <div
      v-for="(curColor, index) in colors"
      :key="index"
      class="theme-color-list"
    >
      <div
        class="theme-color-list-item"
        :style="{
          'border-color': `${
            currentColor == curColor ? curColor : 'transparent'
          }`,
          'box-shadow': `0px 0px 3px ${
            currentColor == curColor ? curColor : 'transparent'
          }`,
        }"
        @click.stop="handleChange(curColor)"
      >
        <span
          :style="{
            border: `2px solid ${curColor}`,
            background: `${curColor}`,
          }"
        ></span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "ThemeColor",
  props: {
    color: {
      type: String,
      default: "",
    },
    onChangeColor: {
      type: Function,
      default: () => {},
    },
  },
  data() {
    return {
      // 主题配色列表
      colors: [
        "#2d8cf0",
        "#19be6b",
        "#ff9900",
        "#ed4014",
        "#13c2c2",
        "#eb2f96",
        "#722ed1",
      ],
      currentColor: "#2d8cf0",
    };
  },
  watch: {
    color: {
      immediate: true,
      handler(val) {
        this.currentColor = val;
      },
    },
  },
  methods: {
    handleChange(color) {
      this.currentColor = color;
      this.onChangeColor(color);
    },
  },
};
</script>
<style lang="less" scoped>
.theme-color-container {
  display: flex;
  flex: auto;
  align-items: center;
  text-align: center;
}
.theme-color-list {
  flex: 1;
  &-item {
    cursor: pointer;
    border-radius: 30px;
    width: 34px;
    height: 34px;
    text-align: center;
    border: 2px solid transparent;
    transition: border-color 0.2s;
    display: inline-block;
    span {
      width: 22px;
      height: 22px;
      border-radius: 30px;
      display: inline-block;
      position: relative;
      top: 50%;
      transform: translateY(-50%);
    }
  }
}
</style>
