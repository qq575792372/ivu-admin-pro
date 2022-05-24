<template>
  <div
    id="i-layout-sider-logo"
    class="i-layout-sider-logo"
    :class="logoClasses"
  >
    <router-link class="i-layout-sider-logo-link" to="/">
      <img :src="logo" class="sider-logo-img" />
      <div v-show="!isCollapsed" class="sider-logo-title">
        {{ title }}
      </div>
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
  background: var(--side-bg);

  &-link {
    height: 60px;
    line-height: 60px;
    display: block;
    transition: all 0.2s;
    text-align: center;
    overflow: hidden;
    white-space: nowrap;

    .sider-logo-img {
      width: 32px;
      height: 32px;
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
      color: var(--side-logo-color);
    }
  }

  &-collapse {
    .sider-logo-img {
    }
    .sider-logo-title {
      // display: none;
    }
  }
}
</style>
