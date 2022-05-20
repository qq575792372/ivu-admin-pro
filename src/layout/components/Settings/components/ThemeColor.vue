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
          'box-shadow': `0px 0px 4px ${
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
    <!-- 动态颜色 -->
    <div class="theme-color-list">
      <div
        class="theme-color-list-item"
        :style="{
          'border-color': `${dynamicColor ? dynamicColor : 'transparent'}`,
          'box-shadow': `0px 0px 4px ${
            dynamicColor ? dynamicColor : 'transparent'
          }`,
        }"
      >
        <ColorPicker
          v-model="dynamicColor"
          transfer
          class="dynamic-color-picker"
          @on-change="changeDynamicColor"
        />
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
      dynamicColor: "",
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
    /**
     * 切换普通颜色
     */
    handleChange(color) {
      this.dynamicColor = "";
      this.currentColor = color;
      this.onChangeColor(color);
    },

    /**
     * 切换动态颜色
     */
    changeDynamicColor() {
      this.currentColor = "";
      this.onChangeColor(this.dynamicColor);
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
    position: relative;
    // 固定颜色
    span {
      width: 22px;
      height: 22px;
      border-radius: 30px;
      display: inline-block;
      position: relative;
      top: 50%;
      transform: translateY(-50%);
    }

    // 动态颜色
    ::v-deep.dynamic-color-picker {
      position: relative;
      top: 50%;
      transform: translateY(-50%);
      .ivu-color-picker-rel {
        .ivu-icon-ios-arrow-down {
          display: none;
        }

        .ivu-color-picker-input {
          padding: 0;
          margin: 0;
          width: 22px;
          height: 22px;
          border-radius: 30px;
          display: inline-block;
          position: relative;
          overflow: hidden;
          position: relative;
          background: none;
          border: none;
          cursor: pointer;
          box-shadow: none;
          .ivu-color-picker-color {
            padding: 0;
            margin: 0;
            width: 100%;
            height: 100%;
            top: 0;
            bottom: 0;
            border-radius: 50%;
            background: conic-gradient(
              from 90deg at 50% 50%,
              rgb(255, 0, 0) -19.41deg,
              rgb(255, 0, 0) 18.76deg,
              rgb(255, 138, 0) 59.32deg,
              rgb(255, 230, 0) 99.87deg,
              rgb(20, 255, 0) 141.65deg,
              rgb(0, 163, 255) 177.72deg,
              rgb(5, 0, 255) 220.23deg,
              rgb(173, 0, 255) 260.13deg,
              rgb(255, 0, 199) 300.69deg,
              rgb(255, 0, 0) 340.59deg,
              rgb(255, 0, 0) 378.76deg
            );
            // 下面所有的div隐藏完
            & > div {
              display: none;
            }
          }
        }
      }
    }
  }
}
</style>
