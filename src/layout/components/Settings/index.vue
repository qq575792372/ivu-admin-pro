<template>
  <div
    id="i-layout-navbar-settings"
    class="i-layout-navbar-settings"
    @click.stop="showSettings = true"
  >
    <!-- 更多设置 -->
    <Icon class="i-icon" type="md-more" />

    <!-- 布局设置 -->
    <Drawer v-model="showSettings" title="布局设置预览" :width="360">
      <!-- 侧边栏主题 -->
      <Divider size="small" style="color: var(--custom-primary-color)">
        侧边栏主题
      </Divider>
      <div class="i-layout-navbar-settings-item">
        <div
          class="i-layout-navbar-settings-item-theme"
          :class="{ on: sideTheme === 'dark' }"
          @click="handleChangeSetting('sideTheme', 'dark')"
        >
          <SvgIcon type="dark" size="52" color="red" />
        </div>
        <div
          class="i-layout-navbar-settings-item-theme"
          :class="{ on: sideTheme === 'light' }"
          @click="handleChangeSetting('sideTheme', 'light')"
        >
          <SvgIcon type="light" size="52" />
        </div>
      </div>

      <!-- 主题色 -->
      <Divider size="small">主题色</Divider>
      <div class="i-layout-navbar-settings-item">
        <template v-for="(color, index) in colors">
          <div
            :key="index"
            :style="{
              'border-color': `${
                currentColor == color ? color : 'transparent'
              }`,
              'box-shadow': `0px 0px 3px ${
                currentColor == color ? color : 'transparent'
              }`,
            }"
            class="i-layout-navbar-settings-item-color"
            @click="handleChangeColor(color)"
          >
            <span
              :style="{
                border: `2px solid ${color}`,
                background: `${color}`,
              }"
            ></span>
          </div>
        </template>
      </div>

      <!-- 布局设置 -->
      <Divider size="small">布局设置</Divider>
      <div class="i-layout-navbar-settings-item">
        <span class="i-layout-navbar-settings-item-desc">固定顶栏</span>
        <span class="i-layout-navbar-settings-item-action">
          <i-switch
            size="small"
            :value="fixedHeader"
            @on-change="(val) => handleChangeSetting('fixedHeader', val)"
          />
        </span>
      </div>
      <div class="i-layout-navbar-settings-item">
        <span class="i-layout-navbar-settings-item-desc">固定侧边栏</span>
        <span class="i-layout-navbar-settings-item-action">
          <i-switch
            size="small"
            :value="fixedSidebar"
            @on-change="(val) => handleChangeSetting('fixedSidebar', val)"
          />
        </span>
      </div>
      <div class="i-layout-navbar-settings-item">
        <span class="i-layout-navbar-settings-item-desc">显示侧边栏Logo</span>
        <span class="i-layout-navbar-settings-item-action">
          <i-switch
            size="small"
            :value="sidebarLogo"
            @on-change="(val) => handleChangeSetting('sidebarLogo', val)"
          />
        </span>
      </div>
      <div class="i-layout-navbar-settings-item">
        <span class="i-layout-navbar-settings-item-desc">
          侧边栏开启手风琴模式
          <Tooltip
            placement="top"
            content="开启后每次只能展开关闭一个菜单项"
            transfer
          >
            <Icon type="ios-help-circle-outline" />
          </Tooltip>
        </span>
        <span class="i-layout-navbar-settings-item-action">
          <i-switch
            size="small"
            :value="menuAccordion"
            @on-change="(val) => handleChangeSetting('menuAccordion', val)"
          />
        </span>
      </div>
      <div class="i-layout-navbar-settings-item">
        <span class="i-layout-navbar-settings-item-desc">
          侧边栏折叠时显示父级菜单名
        </span>
        <span class="i-layout-navbar-settings-item-action">
          <i-switch
            size="small"
            :value="menuCollapseParentTitle"
            @on-change="
              (val) => handleChangeSetting('menuCollapseParentTitle', val)
            "
          />
        </span>
      </div>
      <div class="i-layout-navbar-settings-item">
        <span class="i-layout-navbar-settings-item-desc">
          开启Tabs View标签页
        </span>
        <span class="i-layout-navbar-settings-item-action">
          <i-switch
            size="small"
            :value="tabsView"
            @on-change="(val) => handleChangeSetting('tabsView', val)"
          />
        </span>
      </div>
      <div class="i-layout-navbar-settings-item">
        <span class="i-layout-navbar-settings-item-desc">
          开启Tabs View标签图标
          <Tooltip placement="top" content="需要开启Tabs View标签页" transfer>
            <Icon type="ios-help-circle-outline" />
          </Tooltip>
        </span>
        <span class="i-layout-navbar-settings-item-action">
          <i-switch
            size="small"
            :value="tabsViewIcon"
            :disabled="!tabsView"
            @on-change="(val) => handleChangeSetting('tabsViewIcon', val)"
          />
        </span>
      </div>
      <div class="i-layout-navbar-settings-item">
        <span class="i-layout-navbar-settings-item-desc">
          开启Tabs View标签拖拽排序
          <Tooltip placement="top" content="需要开启Tabs View标签页" transfer>
            <Icon type="ios-help-circle-outline" />
          </Tooltip>
        </span>
        <span class="i-layout-navbar-settings-item-action">
          <i-switch
            size="small"
            :value="tabsViewSort"
            :disabled="!tabsView"
            @on-change="(val) => handleChangeSetting('tabsViewSort', val)"
          />
        </span>
      </div>

      <!-- 其他设置 -->
      <Divider size="small">其他设置</Divider>
      <div class="i-layout-navbar-settings-item">
        <span class="i-layout-navbar-settings-item-desc">开启动态标题</span>
        <span class="i-layout-navbar-settings-item-action">
          <i-switch
            size="small"
            :value="showDynamicTitle"
            @on-change="(val) => handleChangeSetting('showDynamicTitle', val)"
          />
        </span>
      </div>
      <div class="i-layout-navbar-settings-item">
        <span class="i-layout-navbar-settings-item-desc">
          面包屑根目录显示首页
        </span>
        <span class="i-layout-navbar-settings-item-action">
          <i-switch
            size="small"
            :value="rootDashboard"
            @on-change="(val) => handleChangeSetting('rootDashboard', val)"
          />
        </span>
      </div>

      <Alert type="warning">
        <div slot="desc">
          该功能主要实时预览各种布局设置效果，如需项目中默认起作用请在
          <strong>src/settings.js</strong>
          中配置。
        </div>
      </Alert>
    </Drawer>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  name: "Settings",
  data() {
    return {
      showSettings: true,
      colors: [
        "#2d8cf0",
        "#1890ff",
        "#19be6b",
        "#ff9900",
        "#ed4014",
        "#ed49b4",
        "#834ec2",
      ],
      currentColor: "#2d8cf0",
    };
  },
  computed: {
    ...mapState("layout/settings", [
      "sideTheme",
      "fixedHeader",
      "fixedSidebar",
      "sidebarLogo",
      "menuAccordion",
      "menuCollapseParentTitle",
      "tabsView",
      "tabsViewIcon",
      "tabsViewSort",
      "rootDashboard",
      "showDynamicTitle",
    ]),
  },
  methods: {
    handleChangeColor(color) {
      this.currentColor = color;
      document.documentElement.setAttribute("theme-color", color);
      // const root = `:root[theme-color='${color}]`;
      // const styleSheet = document.documentElement.style;
      // styleSheet.innerText = `${root} {
      //   --custom-primary-color: ${color};
      // }`;
      document.documentElement.style.setProperty(
        "--custom-primary-color",
        color
      );
    },

    /**
     * 改变设置
     */
    handleChangeSetting(key, value) {
      this.$store.dispatch("layout/settings/changeLayoutSetting", {
        key,
        value,
      });
    },
  },
};
</script>
<style lang="less" scoped>
.i-layout-navbar-settings {
  display: inline-block;
  cursor: pointer;
  line-height: 60px;
  color: #515a6e;
  padding: 0px 10px;

  .i-icon {
    font-size: 18px;
  }

  // 设置的样式
  &-item {
    display: flex;
    padding: 12px 0;
    align-items: center;
    justify-content: center;

    // 主题
    &-theme {
      display: inline-block;
      position: relative;
      margin-right: 16px;
      cursor: pointer;
      &::after {
        background: transparent;
        content: "";
        display: block;
        width: 6px;
        height: 6px;
        border-radius: 6px;
        margin: 0 auto;
        margin-top: -4px;
      }
      &.on::after {
        background: #19be6b;
      }
    }

    // 主题色
    &-color {
      margin: 0 4px;
      border-radius: 50%;
      height: 34px;
      width: 34px;
      text-align: center;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      border: 2px solid transparent;
      transition: border-color 0.2s;
      span {
        width: 20px;
        height: 20px;
        position: relative;
        display: inline-block;
        border-radius: 30px;
      }
    }
    &-desc {
      flex: 1 1;
      font-size: 14px;
    }
    &-action {
      flex: 0 0 auto;
    }
  }
}
</style>
<style>
/* :root[theme-color="#2d8cf0"] {
  --custom-primary-color: #2d8cf0;
}
:root[theme-color="#1890ff"] {
  --custom-primary-color: #1890ff;
}
:root[theme-color="#19be6b"] {
  --custom-primary-color: #19be6b;
} */
</style>
