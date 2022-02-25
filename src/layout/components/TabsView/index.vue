<template>
  <div id="i-layout-tabs" class="i-layout-tabs">
    <div class="i-layout-tabs-main">
      <Tabs
        type="card"
        closable
        :draggable="tabsViewSort"
        :value="activeRoute.path"
        :animated="false"
        @on-click="handleClick"
        @on-tab-remove="handleTabRemove"
        @on-drag-drop="handleDragDrop"
        @on-contextmenu="handleContextMenu"
      >
        <!-- eslint-disable -->
        <TabPane
          v-for="tab in visitedViews"
          :key="tabKey()"
          :label="(h) => renderLabel(h, tab)"
          :name="tab.fullPath"
          :closable="!isAffix(tab)"
          context-menu
        />
        <template slot="contextMenu">
          <DropdownItem @click.native="refreshSelected">
            <Icon type="md-refresh" />
            刷新页面
          </DropdownItem>
          <DropdownItem
            v-if="!isAffix(selectedTab)"
            @click.native="closeSelected"
          >
            <Icon type="md-close" />
            关闭当前
          </DropdownItem>
          <DropdownItem @click.native="closeAll">
            <Icon type="md-close-circle" />
            全部关闭
          </DropdownItem>
        </template>
      </Tabs>
      <Dropdown class="i-layout-tabs-close">
        <div class="i-layout-tabs-close-dropdown">
          <Icon type="ios-arrow-down" />
        </div>
        <DropdownMenu slot="list">
          <DropdownItem @click.native="closeLeft">
            <Icon type="md-arrow-back" />
            关闭左侧
          </DropdownItem>
          <DropdownItem @click.native="closeRight">
            <Icon type="md-arrow-forward" />
            关闭右侧
          </DropdownItem>
          <DropdownItem @click.native="closeOther">
            <Icon type="md-close" />
            关闭其他
          </DropdownItem>
          <DropdownItem @click.native="closeAll">
            <Icon type="md-close-circle" />
            全部关闭
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapState } from "vuex";
import path from "path";

export default {
  name: "TabsView",
  data() {
    return {
      selectedTab: {}, // 当前右键菜单选择的tab
      affixTabs: [], // 路由中affix=true的
    };
  },
  computed: {
    ...mapState("layout/tabsView", ["visitedViews", "cachedViews"]),
    ...mapState("layout/settings", ["tabsViewIcon", "tabsViewSort"]),
    ...mapGetters(["sidebarRoutes"]),
    // 当前页面的路由
    activeRoute() {
      return this.$route;
    },
  },
  watch: {
    // 监听当前路由变化，添加到tabs集合中
    $route() {
      this.addTabs();
    },
  },
  mounted() {
    this.initTabs();
    this.addTabs();
  },
  methods: {
    /**
     * tab标签的key，必须写，不然删除和拖拽等不起作用
     */
    tabKey(len = 32) {
      const $chars =
        "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
      const maxPos = $chars.length;
      let str = "";
      for (let i = 0; i < len; i++) {
        str += $chars.charAt(Math.floor(Math.random() * maxPos));
      }
      return str;
    },
    /**
     * 初始化标签页
     */
    initTabs() {
      const affixTabs = (this.affixTabs = this.filterAffixTabs(
        this.sidebarRoutes
      ));
      for (const tab of affixTabs) {
        // 必须要有name
        if (tab.name) {
          this.$store.dispatch("layout/tabsView/addVisitedView", tab);
        }
      }
    },
    /**
     * 先过滤出路由中affix=true需要固定在标签中的路由
     */
    filterAffixTabs(routes, basePath = "/") {
      let tags = [];
      routes.forEach((route) => {
        if (route.meta && route.meta.affix) {
          const tabPath = path.resolve(basePath, route.path);
          tags.push({
            fullPath: tabPath,
            path: tabPath,
            name: route.name,
            meta: { ...route.meta },
          });
        }
        if (route.children) {
          const tempTabs = this.filterAffixTabs(route.children, route.path);
          if (tempTabs.length >= 1) {
            tags = [...tags, ...tempTabs];
          }
        }
      });
      return tags;
    },
    /**
     * 渲染tab的label
     */
    renderLabel(h, tab) {
      const title = tab.title;
      const icon = tab.meta.icon;
      let vnodes = [];

      // 同时支持svg和ivu-icon，用icon的图标需要加上ivu-icon前缀
      if (this.tabsViewIcon && icon) {
        if (icon.includes("ivu-icon")) {
          vnodes.push(<i class={["ivu-icon", "sub-ivu-icon", icon]} />);
        } else {
          vnodes.push(<SvgIcon type={icon} />);
        }
      }

      // 设置title
      vnodes.push(<span>{title}</span>);

      // 渲染页面
      return h(
        "div",
        {
          class: "i-layout-tabs-title",
        },
        vnodes
      );
    },

    /**
     * 添加到tabs
     */
    addTabs() {
      const { name } = this.$route;
      if (name) {
        this.$store.dispatch("layout/tabsView/addView", this.$route);
      }
      return false;
    },

    /**
     * 传参的路由是否是当前页面地址的一样
     */
    isActive(route) {
      return route.path === this.$route.path;
    },
    /**
     * 是否固定标签
     */
    isAffix(tab) {
      return tab.meta && tab.meta.affix;
    },

    /**
     * 点击tab
     */
    handleClick(name) {
      const view = this.visitedViews.find((item) => item.fullPath === name);
      this.$router.push({
        path: view.path,
        query: view.query,
        fullPath: view.fullPath,
      });
    },
    /**
     * 删除tab
     */
    handleTabRemove(name) {
      const view = this.visitedViews.find((item) => item.fullPath === name);
      const viewIndex = this.visitedViews.findIndex(
        (item) => item.fullPath === name
      );
      this.$store
        .dispatch("layout/tabsView/delView", view)
        .then(({ visitedViews }) => {
          // 关闭当前路由对应的标签则会调用
          if (this.isActive(view)) {
            this.toNextView(visitedViews, viewIndex);
          }
        });
    },
    /**
     * 拖拽tab
     */
    handleDragDrop(name, newName, a, b) {
      let visitedViews = this.visitedViews;
      visitedViews.splice(b, 1, ...visitedViews.splice(a, 1, visitedViews[b]));
      this.$store.dispatch(
        "layout/tabsView/updateSortVisitedViews",
        visitedViews
      );
    },
    /**
     * 当前tab点击的右键菜单
     */
    handleContextMenu({ name }) {
      const view = this.visitedViews.find((item) => item.fullPath === name);
      this.selectedTab = view;
    },

    /**
     * 刷新当前tab
     */
    refreshSelected() {
      this.$store
        .dispatch("layout/tabsView/delCachedView", this.selectedTab)
        .then(() => {
          const { fullPath } = this.selectedTab;
          this.$nextTick(() => {
            this.$router.replace({
              path: "/redirect" + fullPath,
            });
          });
        });
    },
    /**
     * 关闭当前tab
     */
    closeSelected() {
      const viewIndex = this.visitedViews.findIndex(
        (item) => item.fullPath === this.selectedTab.path
      );
      this.$store
        .dispatch("layout/tabsView/delView", this.selectedTab)
        .then(({ visitedViews }) => {
          // 关闭当前路由对应的标签则会调用
          if (this.isActive(this.selectedTab)) {
            this.toNextView(visitedViews, viewIndex);
          }
        });
    },

    /**
     * 关闭左侧tab
     */
    closeLeft() {
      this.$store.dispatch("layout/tabsView/delLeftViews", this.activeRoute);
    },
    /**
     * 关闭右侧tab
     */
    closeRight() {
      this.$store.dispatch("layout/tabsView/delRightViews", this.activeRoute);
    },
    /**
     * 关闭其他tab
     */
    closeOther() {
      this.$store.dispatch("layout/tabsView/delOthersViews", this.activeRoute);
    },
    /**
     * 关闭所有tab
     */
    closeAll() {
      this.$store
        .dispatch("layout/tabsView/delAllViews")
        .then(({ visitedViews }) => {
          if (this.affixTabs.some((tag) => tag.path === this.$route.path)) {
            return;
          }
          this.toNextView(visitedViews);
        });
    },

    /**
     * 关闭选择标签后的跳转操作
     * 1.如果是关闭所有的，则默认获取visitedViews中最后一个，没有则跳转到首页
     * 2.如果关闭当前路由标签，则默认获取visitedViews里当前关闭的下一个标签，没有则跳转到首页
     * 注：如果关闭非当前路由标签，则直接删除关闭的标签即可，不会调用该方法
     */
    toNextView(visitedViews, index = -1) {
      const nextView = visitedViews.slice(index)[0];
      if (nextView) {
        this.$router.push(nextView.fullPath);
      } else {
        // 全部关闭后，如果没有任何标签，则默认跳转到首页
        this.$nextTick(() => {
          this.$router.replace({
            path: "/redirect/",
          });
        });
      }
    },
  },
};
</script>
<style lang="less">
.i-layout-tabs {
  height: 44px;
  box-sizing: border-box;
  transition: all 0.2s ease-in-out;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  &-main {
    background: #f5f7f9;
    padding: 6px 0;
    margin: 0 12px 0 12px;
    display: flex;
    .ivu-tabs {
      flex: 1;
      flex-grow: 1;
    }
    .i-layout-tabs-close {
      flex: 0;
    }
  }
  &-title {
    display: inline-block;
    .svg-icon {
      margin-right: 8px;
    }
  }

  // 覆盖tabs组件默认样式
  .ivu-tabs.ivu-tabs-card > .ivu-tabs-bar {
    border-bottom: none;
    margin-bottom: 0;
    .ivu-tabs-tab {
      height: 32px;
      background: #fff;
      border-radius: 3px;
      border: none;
      margin-right: 6px;
      color: #808695;
      .ivu-icon-ios-close {
        width: 22px;
        margin-right: -6px;
      }
      &-active {
        height: 32px;
        background: #fff;
        color: #2d8cf0;
      }
    }
  }

  // 覆盖tabs右侧菜单的样式
  .i-layout-tabs-close-dropdown {
    width: 32px;
    height: 32px;
    line-height: 32px;
    text-align: center;
    background-color: #fff;
    border-radius: 2px;
    cursor: pointer;
  }
}
</style>
