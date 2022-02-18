// mobile设备
const MOBILE_MAX_WIDTH = 640;
// 平板设备
const TABLET_MAX_WIDTH = 992;

export default {
  watch: {
    $route() {
      // 是手机设备，每次切换路由页面则隐藏菜单
      if (this.isMobile && !this.isCollapsed) {
        this.$store.dispatch("layout/app/closeSideBar");
      }
    },
  },
  mounted() {
    window.addEventListener("resize", this.$_resizeHandler);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.$_resizeHandler);
  },
  methods: {
    /**
     * 设备是手机
     */
    $_isMobile() {
      const rect = document.body.getBoundingClientRect();
      return rect.width - 1 < MOBILE_MAX_WIDTH;
    },
    /**
     * 设备是平板
     */
    $_isTablet() {
      const rect = document.body.getBoundingClientRect();
      return rect.width - 1 < TABLET_MAX_WIDTH;
    },
    /**
     * 根据窗口大小判断设备类型
     */
    $_resizeHandler() {
      const isMobile = this.$_isMobile();
      const isTablet = this.$_isTablet();
      // 设置设备类型
      this.$store.dispatch(
        "layout/app/toggleDevice",
        isMobile ? "mobile" : isTablet ? "tablet" : "desktop"
      );
      // 如果是手机和平板，则默认折叠左侧
      if (isMobile || isTablet) {
        this.$store.dispatch("layout/app/closeSideBar");
      }
    },
  },
};
