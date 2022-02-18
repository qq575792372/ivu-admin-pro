// 导入layout模块
import app from "./app";
import badges from "./badges";
import tabsView from "./tabs-view";
import settings from "./settings";

// 导出
export default {
  namespaced: true,
  modules: {
    app,
    badges,
    tabsView,
    settings,
  },
};
