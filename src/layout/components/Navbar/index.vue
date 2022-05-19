<template>
  <div class="i-layout-navbar">
    <!-- 折叠左侧菜单 -->
    <Hamburger class="i-layout-navbar-trigger" />
    <!-- 刷新当前页面 -->
    <RefreshPage class="i-layout-navbar-trigger" />
    <!-- 面包屑导航 -->
    <Breadcrumb v-if="!isMobile" />

    <!-- 
      中间显示内容
      可以是搜索框等等
    -->
    <div class="i-layout-navbar-content"></div>

    <!-- 右侧菜单 -->
    <div class="i-layout-navbar-right-menu">
      <!-- 页面全屏 -->
      <Fullscreen v-if="!isMobile" class="i-layout-navbar-trigger" />
      <!-- 系统通知 -->
      <Notify class="i-layout-navbar-trigger" />
      <!-- 用户登录信息 -->
      <UserInfo class="i-layout-navbar-trigger" />
      <!-- 系统设置 -->
      <Settings class="i-layout-navbar-trigger" />
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
// 引入navbar中的组件
import Hamburger from "@/layout/components/Hamburger";
import Breadcrumb from "@/layout/components/Breadcrumb";
import RefreshPage from "@/layout/components/RefreshPage";
import Fullscreen from "@/layout/components/Fullscreen";
import UserInfo from "@/layout/components/UserInfo";
import Settings from "@/layout/components/Settings";
import Notify from "@/layout/components/Notify";

export default {
  name: "Navbar",
  components: {
    Hamburger,
    Breadcrumb,
    RefreshPage,
    Fullscreen,
    UserInfo,
    Settings,
    Notify,
  },
  computed: {
    ...mapGetters(["sidebar", "device"]),
    // 设备类型
    isMobile() {
      return this.device === "mobile";
    },
  },
};
</script>
<style lang="less" scoped>
.i-layout-navbar {
  height: 60px;
  box-sizing: border-box;
  position: relative;
  background: #fff;
  transition: all 0.2s ease-in-out;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  padding-left: 12px;
  display: flex;
  align-items: center;

  // trigger鼠标滑过样式
  &-trigger {
    transition: background 0.2s ease-in-out;
    -webkit-tap-highlight-color: transparent;
    padding: 8px 12px;
    border-radius: 4px;
    &:hover {
      background: #f3f3f3;
    }
    &:active {
      background: #e7e7e7;
    }
  }

  // 中间内容
  &-content {
    flex: 1;
    text-align: center;
  }

  // 右侧按钮菜单样式
  &-right-menu {
  }
}
</style>
