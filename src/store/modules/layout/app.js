import Cookies from "js-cookie";

// state
const state = {
  sidebar: {
    // 侧边栏是否展开
    opened: Cookies.get("sidebarStatus")
      ? !!+Cookies.get("sidebarStatus")
      : true, // sidebarStatus代表的状态：1：展开，0：关闭
  },
  device: "desktop", // 设备类型，桌面：desktop；手机：mobile；平板：tablet
};

// mutations
const mutations = {
  TOGGLE_SIDEBAR: (state) => {
    state.sidebar.opened = !state.sidebar.opened;
    if (state.sidebar.opened) {
      Cookies.set("sidebarStatus", 1);
    } else {
      Cookies.set("sidebarStatus", 0);
    }
  },
  SHOW_SIDEBAR: (state) => {
    Cookies.set("sidebarStatus", 1);
    state.sidebar.opened = true;
  },
  CLOSE_SIDEBAR: (state) => {
    Cookies.set("sidebarStatus", 0);
    state.sidebar.opened = false;
  },
  TOGGLE_DEVICE: (state, device) => {
    state.device = device;
  },
};

// actions
const actions = {
  toggleSideBar({ commit }) {
    commit("TOGGLE_SIDEBAR");
  },
  showSideBar({ commit }) {
    commit("SHOW_SIDEBAR");
  },
  closeSideBar({ commit }) {
    commit("CLOSE_SIDEBAR");
  },
  toggleDevice({ commit }, device) {
    commit("TOGGLE_DEVICE", device);
  },
};

// 导出
export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
