// state
const state = {
  // 左侧菜单显示的徽标，通过vuex来动态更改
  sidebarBadges: [
    {
      path: "/dashboard/index",
      count: 8,
    },
    {
      path: "/components-demo",
      text: "新特性",
      type: "warning",
    },
    // 子菜单显示徽标
    {
      path: "/table/basic-table",
      count: 10,
      type: "success",
    },
    // 一级菜单显示徽标
    {
      path: "/form",
      color: "#2db7f5",
    },
  ],
};

// mutations
const mutations = {
  SET_SIDEBAR_BADGES: (state, data) => {
    state.sidebarBadges = data;
  },
};

// actions
const actions = {
  /**
   * 设置全部的左侧菜单徽标
   * @param {Commit} param0
   * @param {Object} data
   */
  setAllBadge({ commit }, data) {
    commit("SET_SIDEBAR_BADGES", data);
  },
  /**
   * 新增或者修改某个的左侧菜单徽标
   * @param {Commit, State} param0
   * @param {Object} data
   */
  setOneBadge({ commit, state }, { path, badge }) {
    const sidebarBadges = JSON.parse(JSON.stringify(state.sidebarBadges));
    const currentIndex = sidebarBadges.findIndex((item) => item.path === path);
    if (currentIndex >= 0) {
      sidebarBadges[currentIndex] = badge;
    } else {
      sidebarBadges.push(badge);
    }
    commit("SET_SIDEBAR_BADGES", sidebarBadges);
  },
  /**
   * 删除全部的左侧菜单徽标
   * @param {Commit} param0
   */
  removeAllBadge({ commit }) {
    commit("SET_SIDEBAR_BADGES", []);
  },
  /**
   * 删除某个左侧菜单徽标
   * @param {Commit} param0
   * @param {Object} data
   */
  removeOneBadge({ commit }, { path }) {
    const sidebarBadges = JSON.parse(JSON.stringify(state.sidebarBadges));
    const currentIndex = sidebarBadges.findIndex((item) => item.path === path);
    if (currentIndex >= 0) sidebarBadges.splice(currentIndex, 1);
    commit("SET_SIDEBAR_BADGES", sidebarBadges);
  },
};

// 导出
export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
