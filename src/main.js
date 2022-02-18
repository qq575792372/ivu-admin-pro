import Vue from "vue";

// 引入app，router，store
import App from "./App.vue";
import router from "./router";
import store from "./store";

// 引入normalize
import "normalize.css/normalize.css"; // A modern alternative to CSS resets

// 引入view-design
import ViewUI from "view-design";
// 引入自定义主题
import "@/styles/theme/ivu-default.less";
Vue.use(ViewUI);

// 引入全局index样式
import "@/styles/index.less";

// 引入icon图标和权限
import "@/icons";
import "./permission";

// 引入vue-meta-info
import MetaInfo from "vue-meta-info";
Vue.use(MetaInfo);

// 引入vue-clipboard2
import VueClipboard2 from "vue-clipboard2";
Vue.use(VueClipboard2);

// 如果线上需要使用Mock，则需要用到以下代码
/* if (process.env.NODE_ENV === "production") {
  const { mockXHR } = require("../mock");
  mockXHR();
} */

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
