<!-- 滑块验证码组件 -->
<template>
  <div class="i-valid-slider" :class="[size ? `i-valid-slider-${size}` : '']">
    <div class="i-valid-slider-inner" :class="[rangeStatus ? 'success' : '']">
      <!-- 滑过的背景 -->
      <div class="i-valid-slider-bg"></div>
      <!-- 滑块的样式 -->
      <Icon
        :type="rangeStatus ? successIcon : startIcon"
        class="i-valid-slider-arrow font-16"
        :class="rangeStatus ? 'success' : ''"
        @mousedown.native="rangeMove"
      />
      <!-- 显示的文案 -->
      <div class="i-valid-slider-content i-valid-slider-content-animation">
        <span>{{ rangeStatus ? successText : startText }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ValidSlider",
  props: {
    // 尺寸大小：large，default，small
    size: {
      type: String,
      default: "default",
    },

    // 开始的图标
    startIcon: {
      type: String,
      default: "ios-arrow-forward",
    },
    // 开始的文字
    startText: {
      type: String,
      default: "请按住滑块，拖动到最右边",
    },

    // 成功图标
    successIcon: {
      type: String,
      default: "md-checkmark-circle",
    },
    // 成功文字
    successText: {
      type: String,
      default: "验证成功",
    },

    // 成功之后的回调
    onSuccess: {
      type: Function,
    },

    // 失败之后的回调
    onError: {
      type: Function,
    },

    // 重置之后的回调
    onReset: {
      type: Function,
    },
  },

  data() {
    return {
      // 当前滑动的元素
      elem: null,
      // 是否已经验证成功
      rangeStatus: false,
    };
  },
  methods: {
    rangeMove(e) {
      this.elem = e.target;
      let startX = e.clientX;
      let eleWidth = this.elem.offsetWidth;
      let parentWidth = this.elem.parentElement.offsetWidth;
      let MaxX = parentWidth - eleWidth;
      // 获得已滑过背景色元素对象
      let sliderBgElem = this.elem.previousElementSibling;
      // 滑块content元素
      let contentElem = this.elem.nextElementSibling;

      // 已经验证过，不运行
      if (this.rangeStatus) {
        return false;
      }
      // 鼠标拖动
      document.onmousemove = (e) => {
        let endX = e.clientX;
        this.disX = endX - startX;
        if (this.disX <= 0) {
          this.disX = 0;
        }
        if (this.disX >= MaxX - eleWidth) {
          // 减去滑块的宽度,体验效果更好
          this.disX = MaxX;
        }
        // 滑块样式
        this.elem.style.transition = "0s all";
        this.elem.style.transform = "translateX(" + this.disX + "px)";
        // 滑块背景样式
        sliderBgElem.style.transition = "0s all";
        sliderBgElem.style.width = this.disX + "px";

        e.preventDefault();
      };

      // 鼠标释放
      document.onmouseup = () => {
        // 拖动失败
        if (this.disX !== MaxX) {
          // 滑块样式
          this.elem.style.transition = ".5s all";
          this.elem.style.transform = "translateX(0)";
          // 滑块背景样式
          sliderBgElem.style.transition = ".5s all";
          sliderBgElem.style.width = "0px";

          // 失败函数
          this.onError && this.onError();
        } else {
          // 拖动成功
          this.rangeStatus = true;
          // 拖动成功后，移除闪动动画
          contentElem.classList.remove("i-valid-slider-content-animation");

          // 成功函数
          this.onSuccess && this.onSuccess();
        }
        document.onmousemove = null;
        document.onmouseup = null;
      };
    },
    reset() {
      this.rangeStatus = false;
      this.elem.style.transition = "0s all";
      this.elem.style.transform = "translateX(0)";
      // 获得已滑过背景色元素对象
      let sliderBgElem = this.elem.previousElementSibling;
      // 已滑过的样式控制
      sliderBgElem.style.transition = "0s all";
      sliderBgElem.style.width = "0px";

      // 重置回调
      this.onReset && this.onReset();
    },
  },
};
</script>
<style lang="less" scoped>
// 滑动的动画
@keyframes slidetounlock {
  0% {
    background-position: -200px 0;
  }
  100% {
    background-position: 200px 0;
  }
}
.i-valid-slider-content-animation {
  background: -webkit-gradient(
    linear,
    left top,
    right top,
    color-stop(0, #4d4d4d),
    color-stop(0.4, #4d4d4d),
    color-stop(0.5, #fff),
    color-stop(0.6, #4d4d4d),
    color-stop(1, #4d4d4d)
  );
  background-clip: text;
  -webkit-text-fill-color: transparent;
  -webkit-text-size-adjust: none;
  animation: slidetounlock 3s infinite;
}

// 滑块轨道样式
.i-valid-slider {
  // 滑块内
  &-inner {
    background: #e0e0e0;
    position: relative;
    transition: 0.8s all;
    user-select: none;
    overflow: hidden;
    border-radius: 2px;
    display: flex;
    justify-content: center;
    border: solid 1px #e0e0e0;
    align-items: center;
    box-sizing: border-box;
    cursor: pointer;

    // 滑动成功
    &.success {
      background-color: #52c41a;
      border: solid 1px #52c41a;
      color: #fff;
      cursor: default;
      .i-valid-slider-arrow {
        color: #52c41a;
        border: 1px solid #52c41a;
      }
    }
  }

  // 已经滑过的背景
  &-bg {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    width: 0px;
    background: #52c41a;
    opacity: 0.8;
  }

  // 滑块箭头样式
  &-arrow {
    z-index: 2;
    cursor: move;
    position: absolute;
    left: 0;
    width: 42px;
    height: 100%;
    color: #666;
    background-color: #fff;
    border: 1px solid #e0e0e0;
    display: flex;
    justify-content: center;
    align-items: center;
    &.success {
      cursor: default;
    }
  }

  // 滑块中间显示的文案
  &-content {
    flex: 1;
    text-align: center;
    z-index: 1;
  }

  // 尺寸
  // 大
  &-large {
    .i-valid-slider-inner {
      height: 44px;
      font-size: 16px;
      .i-valid-slider-arrow {
        font-size: 18px;
        width: 50px;
      }
    }
  }
  // 默认
  &-default {
    .i-valid-slider-inner {
      height: 36px;
      font-size: 14px;
      .i-valid-slider-arrow {
        font-size: 16px;
        width: 44px;
      }
    }
  }
  // 小
  &-small {
    .i-valid-slider-inner {
      height: 26px;
      font-size: 12px;
      .i-valid-slider-arrow {
        font-size: 14px;
        width: 36px;
      }
    }
  }
}
</style>
