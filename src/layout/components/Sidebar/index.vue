<template>
  <div>
    <!-- logo -->
    <transition name="fade">
      <side-menu-logo v-show="hasLogo" />
    </transition>
    <!-- menu -->
    <Menu
      ref="menu"
      :theme="sideTheme"
      class="i-layout-menu-side i-scrollbar-hide"
      :class="{
        'i-layout-menu-side-collapse': isCollapsed,
        'i-layout-menu-side-has-logo': sidebarLogo,
      }"
      width="auto"
      :accordion="menuAccordion"
      :active-name="activeMenu"
      :open-names="openNames"
    >
      <!-- 菜单已展开 -->
      <!-- eslint-disable -->
      <template v-if="!isCollapsed" v-for="(route, index) in sidebarRoutes">
        <side-menu-item :key="route.path + index" :item="route" :base-path="route.path" />
      </template>

      <!-- 菜单已折叠 -->
      <template v-else>
        <side-menu-collapse :key="route.path + index" :item="route" top-level :base-path="route.path" />
      </template>
    </Menu>
  </div>
</template>
<script>
import { mapGetters, mapState } from "vuex";
// 导入组件
import VueScrollbar from "@/components/VueScrollbar";
import SideMenuLogo from "./MenuLogo";
import SideMenuItem from "./MenuItem";
import SideMenuCollapse from "./MenuCollapse";
// 导入mixins
import SideMenu from "@/layout/mixins/SideMenu";

export default {
  name: "SideMenu",
  components: {
    VueScrollbar,
    SideMenuLogo,
    SideMenuItem,
    SideMenuCollapse,
  },
  mixins: [SideMenu],
  data() {
    return {
      openNames: [],
    };
  },
  computed: {
    ...mapState("layout/settings", [
      "sidebarLogo",
      "sideTheme",
      "menuAccordion",
    ]),
    ...mapGetters(["sidebar", "sidebarRoutes"]),
    // 激活的菜单
    activeMenu() {
      const { meta, path } = this.$route;
      if (meta.activeMenu) {
        return meta.activeMenu;
      }
      return path;
    },
    // 是否显示菜单栏顶部的logo
    hasLogo() {
      return this.sidebarLogo;
    },
    // 是否折叠菜单
    isCollapsed() {
      return !this.sidebar.opened;
    },
  },
  watch: {
    // 监听路由的变化
    $route: {
      handler() {
        this.initOpenNames();
        this.handleUpdateMenuState();
      },
      immediate: true,
    },
    // 监听收缩和打开，并更新菜单的状态值
    isCollapsed() {
      this.handleUpdateMenuState();
    },
  },
  created() {
    this.initOpenNames();
  },
  methods: {
    /**
     * 初始化打开的菜单names
     */
    initOpenNames() {
      const matched = this.$route.matched.filter(
        (item) => item.meta && item.meta.title
      );
      let openNames = [];
      matched.forEach((v, i) => {
        openNames.push(v.path);
      });
      this.openNames = openNames;
    },
    /**
     * 更新菜单组件的状态
     */
    handleUpdateMenuState() {
      this.$nextTick(() => {
        if (this.$refs.menu) {
          this.$refs.menu.updateActiveName();
          this.$refs.menu.updateOpened();
        }
      });
    },
  },
};
</script>
