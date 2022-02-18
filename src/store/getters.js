const getters = {
  // layout
  // app
  sidebar: (state) => state.layout.app.sidebar,
  device: (state) => state.layout.app.device,
  // settings
  showDynamicTitle: (state) => state.layout.settings.showDynamicTitle,
  dynamicTitle: (state) => state.layout.settings.dynamicTitle,

  // permission
  routes: (state) => state.permission.routes,
  addRoutes: (state) => state.permission.addRoutes,
  sidebarRoutes: (state) => state.permission.sidebarRoutes,

  // user
  token: (state) => state.user.token,
  name: (state) => state.user.name,
};
export default getters;
