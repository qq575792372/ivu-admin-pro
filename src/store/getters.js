const getters = {
  /* 布局 */
  // 设备
  sidebar: (state) => state.layout.app.sidebar,
  device: (state) => state.layout.app.device,
  // 系统设置
  showDynamicTitle: (state) => state.layout.settings.showDynamicTitle,
  dynamicTitle: (state) => state.layout.settings.dynamicTitle,

  // 权限和路由
  routes: (state) => state.permission.routes,
  addRoutes: (state) => state.permission.addRoutes,
  sidebarRoutes: (state) => state.permission.sidebarRoutes,
  permissions: (state) => state.permission.permissions,

  // 用户信息
  token: (state) => state.user.token,
  name: (state) => state.user.name,
};

export default getters;
