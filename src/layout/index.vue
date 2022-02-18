<template>
  <Layout class="app-layout" :class="layoutClasses">
    <Sider
      v-if="!isMobile"
      v-model="isCollapsed"
      class="i-layout-sider"
      :class="siderClasses"
      hide-trigger
      :width="sideBarWidth"
      :collapsed-width="64"
      collapsible
    >
      <Sidebar />
    </Sider>
    <Layout class="i-layout-main" :class="mainClasses">
      <Header class="i-layout-header" :class="headerClasses">
        <Navbar />
        <TabsView v-if="tabsView" />
      </Header>
      <Content class="i-layout-content" :class="contentClasses">
        <AppMain />
      </Content>
    </Layout>

    <div v-if="isMobile">
      <Drawer
        :value="showSiderDrawer"
        placement="left"
        :closable="false"
        :class-name="drawerClasses"
        @on-close="handleDrawerClose"
      >
        <Sidebar />
      </Drawer>
    </div>
  </Layout>
</template>
<script>
import { mapState, mapGetters } from "vuex";
import { Navbar, TabsView, Sidebar, AppMain } from "./components";
import defaultSettings from "@/settings";
import ResizeHandler from "./mixins/ResizeHandler";
export default {
  components: {
    Navbar,
    TabsView,
    Sidebar,
    AppMain,
  },
  mixins: [ResizeHandler],
  data() {
    return {};
  },
  computed: {
    ...mapState("layout/settings", [
      "sideTheme",
      "fixedHeader",
      "fixedSidebar",
      "tabsView",
    ]),
    ...mapGetters(["sidebar", "device"]),
    isCollapsed() {
      return !this.sidebar.opened;
    },
    showSiderDrawer() {
      return this.sidebar.opened;
    },
    sideBarWidth() {
      return defaultSettings.sideBarWidth;
    },
    // 设备类型
    isMobile() {
      return this.device === "mobile";
    },
    isTablet() {
      return this.device === "tablet";
    },
    layoutClasses() {
      return {
        mobile: this.device === "mobile",
        tablet: this.device === "tablet",
      };
    },
    siderClasses() {
      return {
        "i-layout-sider-dark": this.sideTheme === "dark",
        "i-layout-sider-light": this.sideTheme === "light",
        "i-layout-sider-fix": this.fixedSidebar,
      };
    },
    mainClasses() {
      return {
        "i-layout-main-with-sider-fix": this.fixedSidebar,
        "i-layout-main-with-sider-fix-collapse":
          this.fixedSidebar && this.isCollapsed,
        "i-layout-main-with-mobile": this.isMobile,
      };
    },
    headerClasses() {
      return {
        "i-layout-header-fix": this.fixedHeader,
        "i-layout-header-with-sider-fix": this.fixedSidebar,
        "i-layout-header-fix-with-sider-collapse":
          this.fixedHeader && this.isCollapsed,
        "i-layout-header-fix-with-tabs": this.fixedHeader && this.tabsView,
        "i-layout-header-with-mobile": this.isMobile,
      };
    },
    contentClasses() {
      return {
        "i-layout-content-with-header-fix": this.fixedHeader,
        "i-layout-content-with-header-fix-with-tabs":
          this.fixedHeader && this.tabsView,
      };
    },
    drawerClasses() {
      let className = "i-layout-drawer-sider-fix";
      if (this.sideTheme === "dark") className += " i-layout-drawer-dark";
      return className;
    },
  },
  methods: {
    handleDrawerClose() {
      this.$store.dispatch("layout/app/closeSideBar");
    },
  },
};
</script>
<style lang="less">
@import "~@/styles/variables.less";
// layout布局
.app-layout {
}
// 左侧sider布局
.i-layout-sider {
  position: relative;
  z-index: 11;
  box-shadow: 2px 0 6px rgba(0, 21, 41, 0.25);
  // 侧边栏主题
  &-dark {
    background: @base-dark-bg;
  }
  &-light {
    background: #fff;
  }
  // 固定侧边栏
  &-fix {
    position: fixed !important;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
}
// 右侧main布局
.i-layout-main {
  min-height: 100vh;
  transition: all 0.2s ease-in-out;
  &-with-sider-fix {
    margin-left: @base-sider-width;
    &-collapse {
      margin-left: 64px;
    }
  }
  // 手机设备
  &-with-mobile {
    transition: none;
    margin-left: 0px;
  }
  // header布局
  .i-layout-header {
    padding: 0px;
    height: auto;
    line-height: 0;
    background: #f5f7f9;
    z-index: 9;
    transition: all 0.2s ease-in-out;
    &-fix {
      position: fixed;
      top: 0;
      right: 0;
      left: @base-sider-width;
      width: calc(~"100% - @{base-sider-width}");
      &-with-sider-fix {
        left: @base-sider-width;
        width: calc(~"100% - @{base-sider-width}");
      }
      &-with-sider-collapse {
        left: 64px;
        width: calc(100% - 64px);
      }
      &-with-tabs {
        z-index: 10;
      }
    }
    // 手机设备
    &-with-mobile {
      transition: none;
      left: 0px;
      width: 100%;
    }
  }
  // content布局
  .i-layout-content {
    transition: all 0.2s ease-in-out;
    &-with-header-fix {
      padding-top: 60px;
      &-with-tabs {
        padding-top: 104px;
      }
    }
  }
}
// drawer样式
.i-layout-drawer-sider-fix {
  .ivu-drawer-body {
    padding: 0;
    overflow: visible;
  }
}
</style>
