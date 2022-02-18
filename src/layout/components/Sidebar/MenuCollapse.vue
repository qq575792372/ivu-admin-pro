<template>
  <div
    v-if="!item.hidden && item.meta"
    :class="{
      'i-layout-menu-side-collapse-top-level': topLevel,
      'i-layout-menu-side-collapse-dark': sideTheme === 'dark' && topLevel,
      'i-layout-menu-side-collapse-light': sideTheme === 'light' && topLevel,
    }"
  >
    <!-- children最多只包含一个元素，并且默认显示根路由 -->
    <Tooltip
      v-if="
        hasOneShowingChild(item.children, item) && !item.alwaysShow && topLevel
      "
      transfer
      :content="onlyOneChild.meta && onlyOneChild.meta.title"
      placement="right"
    >
      <side-menu-link
        v-if="onlyOneChild.meta"
        class="ivu-menu-item"
        :class="{
          'i-layout-menu-side-collapse-top-level-item': true,
          'i-layout-menu-side-collapse-top-level-item-selected':
            activeMenu.includes(resolvePath(onlyOneChild.path)),
        }"
        :to="resolvePath(onlyOneChild.path, item.path)"
      >
        <side-menu-title
          :icon="onlyOneChild.meta.icon || (item.meta && item.meta.icon)"
        />
      </side-menu-link>
    </Tooltip>

    <!-- children包含多个元素，继续遍历子元素 -->
    <Dropdown v-else placement="right-start">
      <!-- 左侧收缩后一级菜单展示的图标 -->
      <li
        v-if="topLevel"
        class="ivu-menu-item"
        :class="{
          'i-layout-menu-side-collapse-top-level-item': topLevel,
          'i-layout-menu-side-collapse-top-level-item-selected':
            openNames.includes(resolvePath(item.path)),
        }"
      >
        <side-menu-title :icon="item.meta && item.meta.icon" />
      </li>

      <!--左侧栏一级菜单弹出的子菜单 -->
      <li
        v-else
        class="ivu-dropdown-item"
        :class="{
          'ivu-menu-item-selected ivu-menu-item-active': openNames.includes(
            resolvePath(item.path)
          ),
        }"
      >
        <side-menu-title
          :icon="item.meta && item.meta.icon"
          :title="item.meta && item.meta.title"
          :subtitle="item.meta && item.meta.subtitle"
        />
        <Icon type="ios-arrow-forward" class="ivu-dropdown-item-arrow" />
      </li>
      <DropdownMenu slot="list">
        <!-- 是否展示父级菜单的名称 -->
        <div
          v-if="menuCollapseParentTitle"
          class="ivu-dropdown-item ivu-dropdown-show-parent"
        >
          <side-menu-title
            :icon="item.meta && item.meta.icon"
            :title="item.meta && item.meta.title"
          />
        </div>
        <!-- 下拉菜单 -->
        <template v-for="(child, index) in item.children">
          <side-menu-link
            v-if="!child.children"
            :key="child.path + index"
            :to="resolvePath(child.path)"
          >
            <DropdownItem
              :divided="child.meta.divided"
              :class="{
                'ivu-menu-item-selected ivu-menu-item-active':
                  openNames.includes(resolvePath(child.path)),
              }"
            >
              <side-menu-title
                :icon="child.meta && child.meta.icon"
                :title="child.meta && child.meta.title"
                :subtitle="child.meta && child.meta.subtitle"
              />
            </DropdownItem>
          </side-menu-link>
          <side-menu-collapse
            v-else
            :key="child.path + index"
            :item="child"
            :base-path="resolvePath(child.path)"
          />
        </template>
      </DropdownMenu>
    </Dropdown>
  </div>
</template>
<script>
import { mapState } from "vuex";
// 导入组件
import SideMenuTitle from "./MenuTitle";
import SideMenuLink from "./MenuLink";
// 导入mixins
import SideMenu from "@/layout/mixins/SideMenu";

export default {
  name: "SideMenuCollapse",
  components: { SideMenuTitle, SideMenuLink },
  mixins: [SideMenu],
  props: {
    // 是否是第一级，区分在于左侧固定和弹出菜单
    topLevel: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    ...mapState("layout/settings", ["sideTheme", "menuCollapseParentTitle"]),
    // 激活的菜单
    activeMenu() {
      const { meta, path } = this.$route;
      if (meta.activeMenu) {
        return meta.activeMenu;
      }
      return path;
    },
    openNames() {
      const matched = this.$route.matched.filter(
        (item) => item.meta && item.meta.title
      );
      let openNames = [];
      matched.forEach((v, i) => {
        openNames.push(v.path);
      });
      return openNames;
    },
  },
};
</script>
