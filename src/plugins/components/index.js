/**
 * 安装公用的组件
 */
const install = function (Vue) {
  Vue.component("PageHeader", () => import("@/components/PageHeader"));

  // 文字链接组件支持 Link 或者 i-link 命名
  Vue.component("ILink", () => import("@/components/Link"));
  Vue.component("Link", () => import("@/components/Link"));

  Vue.component("Title", () => import("@/components/Title"));
  Vue.component("Result", () => import("@/components/Result"));
  Vue.component("Description", () => import("@/components/Description"));
  Vue.component("DescriptionItem", () =>
    import("@/components/Description/DescriptionItem")
  );
  Vue.component("VueScrollbar", () => import("@/components/VueScrollbar"));
  Vue.component("AvatarList", () => import("@/components/AvatarList"));
  Vue.component("ValidSlider", () => import("@/components/ValidSlider"));
};

// 导出
export default install;
