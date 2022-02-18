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
    ...mapState("layout/settings", ["sideTheme"]),
    ...mapGetters(["sidebar"]),
    logoClasses() {
      return {
        "i-layout-sider-logo-collapse": this.isCollapsed,
        "i-layout-sider-logo-dark": this.sideTheme === "dark",
        "i-layout-sider-logo-light": this.sideTheme === "light",
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
  text-align: center;
  overflow: hidden;
  white-space: nowrap;
  display: block;
  transition: all 0.2s ease-in-out;

  &-link {
    height: 100%;
    width: 100%;
    display: inline-block;

    .sider-logo-img {
      max-width: 32px;
      max-height: 32px;
      vertical-align: middle;
      margin-right: 12px;
    }

    .sider-logo-title {
      display: inline-block;
      margin: 0;
      font-weight: 600;
      line-height: 50px;
      font-size: 14px;
      vertical-align: middle;
    }
  }

  &-collapse {
    .sider-logo-img {
      margin-right: 0px;
    }
  }

  // dark和light主题色
  &-dark {
    background: @base-dark-bg;
    & .sider-logo-title {
      color: #fff !important;
    }
  }
  &-light {
    transition: all 0.2s ease-in-out;
    background: #fff;
    & .sider-log-title {
      color: #515a6e !important;
    }
  }
}
</style>
