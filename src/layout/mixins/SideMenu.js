import { mapState } from "vuex";
import path from "path";
import { isExternal } from "@lime-util/util";

export default {
  props: {
    // route object
    item: {
      type: Object,
      default: () => {},
    },
    basePath: {
      type: String,
      default: "",
    },
  },
  data() {
    // 这里要写在外层，为了避免在一些极端情况下循环渲染出现报错
    this.onlyOneChild = null;
    return {};
  },
  computed: {
    ...mapState("layout/badges", ["sidebarBadges"]),
    // 需要展示在菜单上的徽标
    badgeData() {
      let data = null,
        path = null;
      // 包含一个并展示children
      if (this.onlyOneChild && !this.item.alwaysShow) {
        path = this.resolvePath(this.onlyOneChild.path);
      } else {
        // 包含多个child
        path = this.resolvePath(this.item.path);
      }
      const badgeData = this.sidebarBadges.find((item) => item.path === path);
      if (badgeData) data = badgeData;
      return data;
    },
  },
  methods: {
    /**
     * children中包含一个满足条件展示的子元素
     */
    hasOneShowingChild(children = [], parent) {
      if (!children) {
        children = [];
      }
      // 获取children中非hidden的集合
      const showingChildren = children.filter((item) => !item.hidden);

      // 如果集合且只有一个元素则赋值给onlyOneChild
      if (showingChildren.length === 1) {
        this.onlyOneChild = showingChildren[0];
        return true;
      }
      // 如果集合没有元素，则onlyOneChild为父级
      if (showingChildren.length === 0) {
        this.onlyOneChild = { ...parent };
        return true;
      }
      return false;
    },
    /**
     * 转换路径，会拼加basePath + 当前路径
     *
     */
    resolvePath(routePath, rootPath) {
      let basePath = this.basePath || rootPath;
      if (isExternal(basePath)) {
        return basePath;
      }
      if (isExternal(rootPath)) {
        return rootPath;
      }
      // 修复多级菜单下，如果包含子级的菜单多重复拼加当前routePath的问题
      basePath = basePath.replace(routePath, "");
      return path.resolve(basePath, routePath);
    },
  },
};
