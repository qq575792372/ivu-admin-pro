import Vue from "vue";

// 引入app，router，store
import App from "./App.vue";
import router from "./router";
import store from "./store";

// 引入 normalize
import "normalize.css/normalize.css"; // A modern alternative to CSS resets

// 引入 view-design
import ViewUI from "view-design";
import "@/styles/theme/ivu-default.less";
Vue.use(ViewUI);

// 引入全局 index 样式
import "@/styles/index.less";

// 引入 icon 图标和权限
import "@/icons";
import "./permission";

// 引入 vue-meta-info
import MetaInfo from "vue-meta-info";
Vue.use(MetaInfo);

// 引入 vue-clipboard2
import VueClipboard2 from "vue-clipboard2";
Vue.use(VueClipboard2);

// 全局组件
Vue.component("PageHeader", () => import("@/components/PageHeader"));
Vue.component("ILink", () => import("@/components/ILink"));
Vue.component("Result", () => import("@/components/Result"));
Vue.component("Description", () => import("@/components/Description"));
Vue.component("DescriptionItem", () =>
  import("@/components/Description/DescriptionItem")
);
Vue.component("VueScrollbar", () => import("@/components/VueScrollbar"));
Vue.component("AvatarList", () => import("@/components/AvatarList"));
Vue.component("ValidSlider", () => import("@/components/ValidSlider"));

// 组织vue在启动时生成生产提示
Vue.config.productionTip = false;

// 创建Vue实例
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
