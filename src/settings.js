module.exports = {
  /**
   * 页面标签的title
   */
  title: "ivu admin pro",

  /**
   * 侧边栏菜单顶部标题，为空则只显示logo
   */
  sidebarLogoTitle: "ivu后台管理",

  /**
   * 布局设置
   */
  // 侧边栏的宽度，单位px，不可动态修改，需要和 styles/variables.less中 @base-sider-width 保持一致
  sideBarWidth: 230,
  layout: {
    // 侧边栏主题色：深色主题dark，浅色主题light，默认深色dark
    sideTheme: "dark",
    // 是否固定顶栏
    fixedHeader: true,

    // 是否固定左侧栏
    fixedSidebar: true,
    // 是否显示左侧栏顶部的logo
    sidebarLogo: true,
    // 侧边菜单栏是否开启手风琴模式，开启后每次打开菜单只能打开一个
    menuAccordion: true,
    // 菜单折叠时，是否在子菜单显示父级菜单名称
    menuCollapseParentTitle: false,

    // 是否开启 tabsView
    tabsView: true,
    // tabsView标签显示图标
    tabsViewIcon: true,
    // tabsView标签是否支持拖拽排序
    tabsViewSort: true,

    // 面包屑第一层是否显示首页，否则会以当前点击的菜单根目录显示在第一层
    rootDashboard: true,
  },

  /**
   * 是否显示动态标题
   */
  showDynamicTitle: true,
  /**
   * 背景图片高斯模糊程度，（0-100）区间，数字越大越模糊
   */
  loginBgBlur: "20",
};
