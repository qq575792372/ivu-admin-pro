// 导入layout模块
import app from "./app";
import badges from "./badges";
import tabsView from "./tabs-view";
import settings from "./settings";

export default {
  namespaced: true,
  modules: {
    app,
    badges,
    tabsView,
    settings
  }
};
