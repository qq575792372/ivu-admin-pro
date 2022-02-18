import { constantRoutes } from "@/router";

/**
 * 将字符串组件路径转换为vue的组件
 * @param {Component} component 组件字符串路径
 * @returns
 */
function loadComponent(component) {
  return (resolve) => require([`@/views/${component}`], resolve);
}
/**
 * 过滤异步获取的路由菜单数据，组装成vue路由组件
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(asyncRoutes) {
  const res = [];

  asyncRoutes.forEach((route) => {
    const tmp = { ...route };
    if (tmp.children) {
      tmp.children = filterAsyncRoutes(tmp.children);
    }
    res.push(tmp);
  });

  return res;
}

// state
const state = {
  routes: [], // 当前所有的路由数据
  addRoutes: [], // 获取到的异步路由数据
  sidebarRoutes: [], // 左侧菜单展示的路由数据，当开启topNav时候左侧路由需要过滤
};

// mutations
const mutations = {
  RESET_ROUTES: (state, routes) => {
    state.addRoutes = [];
    state.routes = [];
    state.sidebarRoutes = [];
  },
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes;
    state.routes = constantRoutes.concat(routes);
    state.sidebarRoutes = constantRoutes.concat(routes);
  },
  SET_SIDEBAR_ROUTES: (state, sidebarRoutes) => {
    state.sidebarRoutes = sidebarRoutes;
  },
};

// action
const actions = {
  /**
   * 解析路由数据，并commit
   * @param {*} param0
   * @param {*} routes
   * @returns
   */
  generateRoutes({ commit }, asyncRoutes) {
    return new Promise((resolve) => {
      const accessRoutes = filterAsyncRoutes(asyncRoutes);
      commit("SET_ROUTES", accessRoutes);
      resolve(accessRoutes);
    });
  },
  /**
   * 开启topNav后，通过点击的菜单，筛选出来对应的路由并保存
   * @param {*} param0
   * @param {*} sidebarRoutes
   */
  changeSidebarRoutes({ commit }, sidebarRoutes) {
    commit("SET_SIDEBAR_ROUTES", sidebarRoutes);
  },
};

// 导出
export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
