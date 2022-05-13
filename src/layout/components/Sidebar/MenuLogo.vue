<template>
  <div
    id="i-layout-sider-logo"
    class="i-layout-sider-logo"
    :class="logoClasses"
  >
    <router-link
      v-if="isCollapsed"
      key="collapse"
      class="i-layout-sider-logo-link"
      to="/"
    >
      <img v-if="logo" :src="logo" class="sider-logo-img" />
      <h1 v-else class="sider-logo-title">
        {{ title }}
      </h1>
    </router-link>
    <router-link v-else key="expand" class="i-layout-sider-logo-link" to="/">
      <img v-if="logo" :src="logo" class="sider-logo-img" />
      <h1 class="sider-logo-title">
        {{ title }}
      </h1>
    </router-link>
  </div>
</template>
<script>
import { mapState, mapGetters } from "vuex";
import { sidebarLogoTitle } from "@/settings";
export default {
  name: "SideMenuLogo",
  data() {
    return {
      title: sidebarLogoTitle,
      logo: require("../../../assets/logo.png"),
    };
  },
  computed: {
    ...mapState("layout/settings", ["themeMode"]),
    ...mapGetters(["sidebar"]),
    logoClasses() {
      return {
        "i-layout-sider-logo-collapse": this.isCollapsed,
      };
    },
    // 是否折叠菜单
    isCollapsed() {
      return !this.sidebar.opened;
    },
  },
};
</script>

<style lang="less" scoped>
@import "~@/styles/variables.less";

.i-layout-sider-logo {
  position: relative;
  width: 100%;
  height: 60px;
  line-height: 60px;
  overflow: hidden;
  white-space: nowrap;
  display: flex;
  align-items: center;
  text-align: center;
  padding: 10px;
  background: var(--side-bg);

  &-link {
    flex: 1;
    transition: width 0.28s;
    transition-timing-function: cubic-bezier(0.645, 0.045, 0.355, 1);

    .sider-logo-img {
      max-width: 32px;
      max-height: 32px;
      vertical-align: middle;
    }

    .sider-logo-title {
      display: inline-block;
      margin: 0;
      margin-left: 12px;
      font-weight: 600;
      line-height: 50px;
      font-size: 16px;
      vertical-align: middle;
      color: var(--logo-text-color);
    }
  }

  &-collapse {
    .sider-logo-img {
    }
  }
}
</style>
