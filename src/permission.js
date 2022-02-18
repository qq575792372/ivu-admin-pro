import router from "./router";
import store from "./store";
import NProgress from "nprogress"; // progress bar
import "nprogress/nprogress.css"; // progress bar style
import { getToken } from "@/utils/auth"; // get token from cookie

// 引入异步路由菜单数据
import { asyncRoutes } from "./router/async-routes";

NProgress.configure({ showSpinner: false }); // NProgress Configuration

const whiteList = ["/login"]; // no redirect whitelist

// 路由前置守卫
router.beforeEach(async (to, from, next) => {
  // start progress bar
  NProgress.start();
  // 设置页面标题（如果开启了动态标题则会拼加路由的title）
  to.meta.title &&
    store.dispatch("layout/settings/changeDynamicTitle", to.meta.title);

  // 获取登录的token
  const hasToken = getToken();
  if (hasToken) {
    if (to.path === "/login") {
      // 如果已经登录，地址栏输入login，则默认跳转到首页
      next({ path: "/" });
      NProgress.done();
    } else {
      // 拉取过权限路由菜单，不再添加
      if (store.getters.addRoutes.length > 0) {
        next();
      } else {
        // 权限路由
        const accessRoutes = await store.dispatch(
          "permission/generateRoutes",
          asyncRoutes
        );
        // 追加个404页面，防止随意输入地址找不到
        accessRoutes.push({ path: "*", redirect: "/404", hidden: true });
        // 添加到路由链
        router.addRoutes(accessRoutes);
        next({ ...to, replace: true });
      }
    }
  } else {
    // 没有token
    // 在白名单中的路由地址正常跳转
    if (whiteList.indexOf(to.path) !== -1) {
      next();
    } else {
      // 不在白名单，并且没有登录的token则跳转到login，并且地址带入redirect来源
      next(`/login?redirect=${to.path}`);
      NProgress.done();
    }
  }
});

router.afterEach((to, from) => {
  // finish progress bar
  NProgress.done();
});
