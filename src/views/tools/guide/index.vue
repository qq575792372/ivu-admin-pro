<template>
  <div class="app-container">
    <!-- 页面标题 -->
    <PageHeader title="Driver操作引导" content="前端操作引导插件，基于 driver.js" />

    <!-- main -->
    <div class="main-container" id="main-container">
      <div class="demo-block">
        <div class="demo-title">
          基本用法
        </div>
        <div class="demo-desc">
          示例是指引顶部和左侧菜单，需要设置中关闭固定后，插件才正常显示（z-index在父元素是fixed，float等不起作用）。
        </div>
        <div class="demo-use">
          <Button type="primary" @click.prevent.stop="guide">开启操作指引</Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Driver from "driver.js";
import "driver.js/dist/driver.min.css";

export default {
  data() {
    return {
      // driver
      driver: null,

      // 配置指引步骤
      steps: [
        {
          element: "#i-layout-navbar-hamburger",
          popover: {
            title: "hamburger",
            description: "可以折叠和展开菜单",
            position: "bottom"
          }
        },
        {
          element: "#i-layout-navbar-refresh",
          popover: {
            title: "刷新",
            description: "点击刷新当前页面"
          }
        },
        {
          element: "#i-layout-navbar-breadcrumb",
          popover: {
            title: "面包屑",
            description: "面包屑路径"
          }
        },
        {
          element: "#i-layout-sider-logo",
          popover: {
            title: "菜单logo",
            description: "点击可以返回首页"
          }
        }
      ]
    };
  },
  mounted() {
    this.initDriver();
  },
  methods: {
    initDriver() {
      this.driver = new Driver({
        animate: true,
        opacity: 0.6,
        doneBtnText: "我知道了",
        closeBtnText: "跳过", //  关闭按钮文案
        nextBtnText: "下一步", // 下一步的按钮文案
        prevBtnText: "上一步" // 上一步的按钮文案
      });
    },
    guide() {
      this.driver.defineSteps(this.steps);
      this.driver.start();
    }
  }
};
</script>
