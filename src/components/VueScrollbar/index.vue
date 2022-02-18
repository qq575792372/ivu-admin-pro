<!-- 封装vue-scroll组件 -->
<template>
  <vue-scroll ref="vueScrollRef" :ops="scrollOptions">
    <slot />
  </vue-scroll>
</template>

<script>
import VueScroll from "vuescroll";
export default {
  name: "VueScrollbar",
  components: { VueScroll },
  props: {
    options: {
      require: false,
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      scrollOptions: {
        vuescroll: {
          wheelScrollDuration: 260, // 滚动动画延迟
        },
        scrollPanel: {},
        // 滚动条背景配置
        rail: {},
        // 滚动条滑块配置
        bar: {
          onlyShowBarOnScroll: false, // 是否只在滚动时候显示bar
          background: "#909399",
          opacity: 0.5,
        },
      },
    };
  },
  created() {
    this.initOptions();
  },
  methods: {
    initOptions() {
      this.scrollOptions = { ...this.scrollOptions, ...this.options };
      console.log(" this.scrollOptions ", this.scrollOptions);
      setTimeout(() => {
        this.$refs.vueScrollRef.refresh();
      }, 100);
    },
  },
};
</script>
