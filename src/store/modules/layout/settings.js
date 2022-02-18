import defaultSettings from "@/settings";

// state
const state = {
  // layout属性
  ...defaultSettings.layout,
  // 动态标题，只会在开启showDynamicTitle=true后起作用
  showDynamicTitle: defaultSettings.showDynamicTitle,
  dynamicTitle: "",
};

// mutations
const mutations = {
  SET_LAYOUT_SETTING: (state, { key, value }) => {
    if (state.hasOwnProperty(key)) {
      state[key] = value;
    }
  },
  SET_DYNAMIC_TITLE: (state, dynamicTitle) => {
    state.dynamicTitle = dynamicTitle;
  },
};

// actions
const actions = {
  // 保存布局设置
  changeLayoutSetting({ commit }, data) {
    commit("SET_LAYOUT_SETTING", data);
  },
  // 保存动态标题
  changeDynamicTitle({ commit }, dynamicTitle) {
    commit("SET_DYNAMIC_TITLE", dynamicTitle);
  },
};

// 导出
export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
