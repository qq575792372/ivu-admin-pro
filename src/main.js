import Vue from "vue";

// import normalize
import "normalize.css/normalize.css"; // A modern alternative to CSS resets

// import view-design
import ViewUI from "view-design";
// 使用自定义主题覆盖默认的
import "@/styles/view-variables.less";

// import global index.less
import "@/styles/index.less";

// import app,router,store
import App from "./App.vue";
import router from "./router";
import store from "./store";

// import icons and permission
import "@/icons";
import "./permission";

// import vue-meta-info
import MetaInfo from "vue-meta-info";

// import vue-clipboard2
import VueClipboard2 from "vue-clipboard2";

// 如果线上需要使用Mock，则需要用到以下代码
// if (process.env.NODE_ENV === 'production') {
//   const { mockXHR } = require('../mock')
//   mockXHR()
// }

// use view-design
Vue.use(ViewUI);
// use vue-meta-info
Vue.use(MetaInfo);
// use vue-clipboard2
Vue.use(VueClipboard2);

// 全局引入公用组件并挂载
Vue.component("PageHeader", () => import("@/components/PageHeader"));
Vue.component("ILink", () => import("@/components/ILink"));
Vue.component("Result", () => import("@/components/Result"));
Vue.component("Description", () => import("@/components/Description"));
Vue.component("DescriptionItem", () => import("@/components/Description/DescriptionItem"));
Vue.component("VueScrollbar", () => import("@/components/VueScrollbar"));
Vue.component("AvatarList", () => import("@/components/AvatarList"));
Vue.component("ValidSlider", () => import("@/components/ValidSlider"));

//设置为false以阻止vue在启动时生成生产提示。
Vue.config.productionTip = false;

// create vue
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
