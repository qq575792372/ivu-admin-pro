import Vue from "vue";

// 引入app，router，store
import App from "./App.vue";
import router from "./router";
import store from "./store";

// 引入 normalize
import "normalize.css/normalize.css"; // A modern alternative to CSS resets

// 引入 view-design
import ViewUI from "view-design";
import "view-design/src/styles/index.less";
import "@/styles/theme/ivu-theme.less";
Vue.use(ViewUI);

// 引入全局 index 样式
import "@/styles/index.less";

// 引入 icon 图标和权限
import "@/icons";
import "./permission";

// 使用指令
import directives from "./directives";
Vue.use(directives);

// 使用过滤器
import filters from "./filters";
Vue.use(filters);

// 引入 vue-meta-info
import MetaInfo from "vue-meta-info";
Vue.use(MetaInfo);

// 引入 vue-clipboard2
import VueClipboard2 from "vue-clipboard2";
Vue.use(VueClipboard2);

// 引入全局组件
import components from "@/plugin/components";
Vue.use(components);

// 挂载全局权限校验方法
import { hasPermission } from "@/utils/permission";
Vue.prototype.hasPermission = hasPermission;

// 挂载全局 baseUrl 变量
Vue.prototype.baseUrl =
  process.env.VUE_APP_BASE_SERVE + process.env.VUE_APP_BASE_API;

// 组织vue在启动时生成生产提示
Vue.config.productionTip = false;

// 创建Vue实例
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
