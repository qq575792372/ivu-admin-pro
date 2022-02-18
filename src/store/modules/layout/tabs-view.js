// state
const state = {
  visitedViews: [], // tab中打开的路由
  cachedViews: [], // 需要缓存的路由，只会在开启tabsView时候才会记录
};

// mutations
const mutations = {
  // 增加tabs
  ADD_VISITED_VIEW: (state, view) => {
    if (state.visitedViews.some((v) => v.path === view.path)) return;
    state.visitedViews.push(
      Object.assign({}, view, {
        title: view.meta.title || "未命名",
      })
    );
  },
  // 增加缓存的tabs
  ADD_CACHED_VIEW: (state, view) => {
    if (state.cachedViews.includes(view.name)) return;
    // 设置为noCache=true时候会过滤掉
    if (!view.meta.noCache) {
      state.cachedViews.push(view.name);
    }
  },

  // 删除某个tabs
  DEL_VISITED_VIEW: (state, view) => {
    for (const [i, v] of state.visitedViews.entries()) {
      if (v.path === view.path) {
        state.visitedViews.splice(i, 1);
        break;
      }
    }
  },
  // 删除缓存的tabs
  DEL_CACHED_VIEW: (state, view) => {
    const index = state.cachedViews.indexOf(view.name);
    index > -1 && state.cachedViews.splice(index, 1);
  },

  // 删除其他tabs
  DEL_OTHERS_VISITED_VIEWS: (state, view) => {
    state.visitedViews = state.visitedViews.filter((v) => {
      return v.meta.affix || v.path === view.path;
    });
  },
  // 删除其他缓存的tabs
  DEL_OTHERS_CACHED_VIEWS: (state, view) => {
    const index = state.cachedViews.indexOf(view.name);
    if (index > -1) {
      state.cachedViews = state.cachedViews.slice(index, index + 1);
    } else {
      state.cachedViews = [];
    }
  },

  // 删除所有tabs
  DEL_ALL_VISITED_VIEWS: (state) => {
    const affixTabs = state.visitedViews.filter((tab) => tab.meta.affix);
    state.visitedViews = affixTabs;
  },
  // 删除所有缓存的tabs
  DEL_ALL_CACHED_VIEWS: (state) => {
    state.cachedViews = [];
  },

  // 更新tabs
  UPDATE_VISITED_VIEW: (state, view) => {
    for (let v of state.visitedViews) {
      if (v.path === view.path) {
        v = Object.assign(v, view);
        break;
      }
    }
  },
  // 更新tabs的拖拽排序
  UPDATE_SORT_VISITED_VIEWS: (state, views) => {
    state.visitedViews = views;
  },

  // 删除右边的tabs
  DEL_RIGHT_VIEWS: (state, view) => {
    const index = state.visitedViews.findIndex((v) => v.path === view.path);
    if (index === -1) {
      return;
    }
    state.visitedViews = state.visitedViews.filter((item, idx) => {
      if (idx <= index || (item.meta && item.meta.affix)) {
        return true;
      }
      const i = state.cachedViews.indexOf(item.name);
      if (i > -1) {
        state.cachedViews.splice(i, 1);
      }
      return false;
    });
  },
  // 删除左边的tabs
  DEL_LEFT_VIEWS: (state, view) => {
    const index = state.visitedViews.findIndex((v) => v.path === view.path);
    if (index === -1) {
      return;
    }
    state.visitedViews = state.visitedViews.filter((item, idx) => {
      if (idx >= index || (item.meta && item.meta.affix)) {
        return true;
      }
      const i = state.cachedViews.indexOf(item.name);
      if (i > -1) {
        state.cachedViews.splice(i, 1);
      }
      return false;
    });
  },
};

// actions
const actions = {
  // 增加view（包含缓存的view）
  addView({ dispatch }, view) {
    dispatch("addVisitedView", view);
    dispatch("addCachedView", view);
  },
  // 增加view
  addVisitedView({ commit }, view) {
    commit("ADD_VISITED_VIEW", view);
  },
  // 增加缓存view
  addCachedView({ commit }, view) {
    commit("ADD_CACHED_VIEW", view);
  },

  // 删除view（包含缓存的view）
  delView({ dispatch, state }, view) {
    return new Promise((resolve) => {
      dispatch("delVisitedView", view);
      dispatch("delCachedView", view);
      resolve({
        visitedViews: [...state.visitedViews],
        cachedViews: [...state.cachedViews],
      });
    });
  },
  // 删除view
  delVisitedView({ commit, state }, view) {
    return new Promise((resolve) => {
      commit("DEL_VISITED_VIEW", view);
      resolve([...state.visitedViews]);
    });
  },
  // 删除缓存view
  delCachedView({ commit, state }, view) {
    return new Promise((resolve) => {
      commit("DEL_CACHED_VIEW", view);
      resolve([...state.cachedViews]);
    });
  },

  // 删除其他views
  delOthersViews({ dispatch, state }, view) {
    return new Promise((resolve) => {
      dispatch("delOthersVisitedViews", view);
      dispatch("delOthersCachedViews", view);
      resolve({
        visitedViews: [...state.visitedViews],
        cachedViews: [...state.cachedViews],
      });
    });
  },
  // 删除其他views
  delOthersVisitedViews({ commit, state }, view) {
    return new Promise((resolve) => {
      commit("DEL_OTHERS_VISITED_VIEWS", view);
      resolve([...state.visitedViews]);
    });
  },
  // 删除其他缓存的views
  delOthersCachedViews({ commit, state }, view) {
    return new Promise((resolve) => {
      commit("DEL_OTHERS_CACHED_VIEWS", view);
      resolve([...state.cachedViews]);
    });
  },

  // 删除所有views（包含缓存的）
  delAllViews({ dispatch, state }, view) {
    return new Promise((resolve) => {
      dispatch("delAllVisitedViews", view);
      dispatch("delAllCachedViews", view);
      resolve({
        visitedViews: [...state.visitedViews],
        cachedViews: [...state.cachedViews],
      });
    });
  },
  // 删除所有views
  delAllVisitedViews({ commit, state }) {
    return new Promise((resolve) => {
      commit("DEL_ALL_VISITED_VIEWS");
      resolve([...state.visitedViews]);
    });
  },
  // 删除所有缓存views
  delAllCachedViews({ commit, state }) {
    return new Promise((resolve) => {
      commit("DEL_ALL_CACHED_VIEWS");
      resolve([...state.cachedViews]);
    });
  },

  // 更新view
  updateVisitedView({ commit }, view) {
    commit("UPDATE_VISITED_VIEW", view);
  },
  // 更新views的排序
  updateSortVisitedViews({ commit }, views) {
    commit("UPDATE_SORT_VISITED_VIEWS", views);
  },

  // 删除右侧views
  delRightViews({ commit }, view) {
    return new Promise((resolve) => {
      commit("DEL_RIGHT_VIEWS", view);
      resolve([...state.visitedViews]);
    });
  },
  // 删除左侧views
  delLeftViews({ commit }, view) {
    return new Promise((resolve) => {
      commit("DEL_LEFT_VIEWS", view);
      resolve([...state.visitedViews]);
    });
  },
};

// 导出
export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
