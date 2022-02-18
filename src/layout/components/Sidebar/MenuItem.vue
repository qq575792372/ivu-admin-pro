<template>
  <div v-if="!item.hidden && item.meta" class="i-layout-menu-side-submenu">
    <!-- children最多只包含一个元素，并且默认显示根路由 -->
    <template
      v-if="hasOneShowingChild(item.children, item) && !item.alwaysShow"
    >
      <MenuItem
        v-if="onlyOneChild.meta && onlyOneChild.meta.title"
        :name="resolvePath(onlyOneChild.path)"
        :to="resolvePath(onlyOneChild.path)"
        :target="onlyOneChild.meta.target"
      >
        <side-menu-title
          :icon="
            (onlyOneChild.meta && onlyOneChild.meta.icon) ||
            (item.meta && item.meta.icon)
          "
          :title="onlyOneChild.meta.title"
          :subtitle="onlyOneChild.meta.subtitle"
        />
        <!-- 子菜单的徽标 -->
        <Badge
          v-if="badgeData"
          class="i-layout-menu-side-badge"
          v-bind="badgeData"
        />
      </MenuItem>
    </template>

    <!-- children包含多个元素，继续遍历子元素 -->
    <Submenu v-else ref="subMenu" :name="resolvePath(item.path)">
      <template slot="title">
        <side-menu-title
          v-if="item.meta"
          :icon="item.meta && item.meta.icon"
          :title="item.meta.title"
          :subtitle="item.meta.subtitle"
        />
        <!-- 一级或多级父菜单的徽标 -->
        <Badge
          v-if="badgeData"
          class="i-layout-menu-side-badge"
          v-bind="badgeData"
        />
      </template>
      <side-menu-item
        v-for="child in item.children"
        :key="child.path"
        :item="child"
        :base-path="resolvePath(child.path)"
      />
    </Submenu>
  </div>
</template>
<script>
// 引入组件
import SideMenuTitle from "./MenuTitle";

// 引入mixins
import SideMenu from "@/layout/mixins/SideMenu";

export default {
  name: "SideMenuItem",
  components: { SideMenuTitle },
  mixins: [SideMenu],
};
</script>
