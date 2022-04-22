<script>
export default {
  name: "SideMenuTitle",
  functional: true,
  props: {
    icon: {
      type: String,
      default: "",
    },
    title: {
      type: String,
      default: "",
    },
    subtitle: {
      type: String,
      default: "",
    },
  },
  render(h, context) {
    const { icon, title, subtitle } = context.props;
    const vnodes = [];
    // 同时支持svg和ivu-icon，用icon的图标需要加上ivu-icon前缀
    if (icon) {
      if (icon.includes("ivu-icon")) {
        vnodes.push(<i class={["ivu-icon", "sub-ivu-icon", icon]} />);
      } else {
        vnodes.push(<SvgIcon type={icon} size="16" />);
      }
    }
    // 显示标题和子标题
    if (title) {
      vnodes.push(
        <span
          class={[
            "i-layout-menu-side-submenu-title",
            subtitle ? "i-layout-menu-side-submenu-title-with-subtitle" : "",
          ]}
        >
          {title}
          <span
            class={[
              "i-layout-menu-side-submenu-subtitle",
              icon ? "i-layout-menu-side-submenu-subtitle-with-icon" : "",
            ]}
          >
            {subtitle}
          </span>
        </span>
      );
    }
    return vnodes;
  },
};
</script>

<style scoped>
.sub-ivu-icon {
  color: currentColor;
  font-size: 16px;
}
</style>
