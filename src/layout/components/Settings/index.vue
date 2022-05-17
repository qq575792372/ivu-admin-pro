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
      <Divider size="small">侧边栏主题</Divider>
      <div class="i-layout-navbar-settings-item">
        <div
          class="i-layout-navbar-settings-item-theme"
          :class="{ on: themeMode === 'dark' }"
          @click="onChangeTheme('dark')"
        >
          <SvgIcon type="dark" size="52" color="red" />
        </div>
        <div
          class="i-layout-navbar-settings-item-theme"
          :class="{ on: themeMode === 'light' }"
          @click="onChangeTheme('light')"
        >
          <SvgIcon type="light" size="52" />
        </div>
      </div>

      <!-- 主题色 -->
      <Divider size="small">主题色</Divider>
      <div class="i-layout-navbar-settings-item">
        <ThemeColor
          class="i-layout-navbar-settings-item-color"
          :color="primaryColor"
          :on-change-color="onChangeColor"
        />
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
import {
  hexToRgb,
  rgbToHex,
  setSessionStorage,
  getSessionStorage,
} from "@lime-util/util";
import { mapState } from "vuex";
import ThemeColor from "./components/ThemeColor";

const version = require("view-design/package.json").version;

export default {
  name: "Settings",
  components: { ThemeColor },
  data() {
    return {
      showSettings: false,
      // 主色和转换后的样式，默认从缓存取
      primaryColor: getSessionStorage("theme-color") || "#2d8cf0",
      cssText: getSessionStorage("theme-css") || "",
    };
  },
  computed: {
    ...mapState("layout/settings", [
      "themeMode",
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
  created() {
    // 转换颜色
    this.transThemeColor();
    // 生成样式
    this.renderIviewCss();
  },
  methods: {
    /**
     * 改变主题
     */
    onChangeTheme(mode) {
      this.$store.dispatch("layout/settings/changeThemeMode", mode);
      document.documentElement.setAttribute("theme-mode", mode);
    },

    /**
     * 改变主题颜色
     */
    async onChangeColor(color) {
      // 设置新的主题色
      this.primaryColor = color;
      // 将选择的颜色保存到缓存中
      setSessionStorage("theme-color", color);

      // 没有获取过iview样式，从第三发拉取，并转换为支持var的
      if (!this.cssText) {
        this.cssText = await this.getCssString();
        this.transIviewCss();
      }

      // 生成颜色
      this.transThemeColor();
      // 生成样式
      this.renderIviewCss();
    },

    /**
     * 转换iview主题色的css
     */
    transIviewCss() {
      let cssText = this.cssText;
      let oldThemeColors = {
        "primary-color": "#2d8cf0",
        shade5: "#2b85e4",
        tint20: "#57a3f3",
        tint80: "#d5e8fc",
        tint90: "#eaf4fe",
      };

      for (let key in oldThemeColors) {
        let reg = new RegExp(oldThemeColors[key], "g");
        cssText = cssText
          .replace(reg, "var(--" + key + ")")
          .replace(/\f/g, "\\f");
      }
      // 将转换后的样式缓存
      setSessionStorage("theme-css", cssText);
      // 设置css文本样式
      this.cssText = cssText;
    },

    /**
     * 生成颜色
     */
    transThemeColor() {
      // hex颜色转为rgba
      let primaryColor = hexToRgb(this.primaryColor);
      const rgbaNumber = primaryColor
        .replace("rgb(", "")
        .replace(")", "")
        .split(",");

      let transThemeInfo = {
        "primary-color": [...rgbaNumber].map(Number), //  主题原色
        shade5: [...rgbaNumber].map(Number), // 与黑色混合 5%
        tint20: [...rgbaNumber].map(Number), // 与白色混合 20%
        tint80: [...rgbaNumber].map(Number), // 与白色混合 80%
        tint90: [...rgbaNumber].map(Number), //  与白色混合 90%
      };
      // 颜色饱和度
      for (let i = 0; i < 3; i++) {
        transThemeInfo.shade5[i] = Math.ceil(
          transThemeInfo.shade5[i] - transThemeInfo.shade5[i] * 0.05
        );
        transThemeInfo.tint20[i] = Math.ceil(
          transThemeInfo.tint20[i] + 255 * 0.2 - transThemeInfo.tint20[i] * 0.2
        );
        transThemeInfo.tint80[i] = Math.ceil(
          transThemeInfo.tint80[i] + 255 * 0.8 - transThemeInfo.tint80[i] * 0.8
        );
        transThemeInfo.tint90[i] = Math.ceil(
          transThemeInfo.tint90[i] + 255 * 0.9 - transThemeInfo.tint90[i] * 0.9
        );
      }
      for (let key in transThemeInfo) {
        document.body.style.setProperty(
          "--" + key,
          rgbToHex("rgba(" + transThemeInfo[key].join() + ")")
        );
      }
      return transThemeInfo;
    },

    /**
     * 生成样式
     */
    renderIviewCss() {
      let styleTag = document.getElementById("iview-style");
      if (!styleTag) {
        styleTag = document.createElement("style");
        styleTag.id = "iview-style";
        styleTag.type = "text/css";
        document.head.append(styleTag);
      }
      styleTag.innerText = this.cssText;
    },

    /**
     * 从第三方获取Css样式
     */
    getCssString() {
      return new Promise((resolve) => {
        const cssUrl = `https://unpkg.com/view-design@${version}/dist/styles/iview.css`;
        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = () => {
          if (xhr.readyState === 4 && xhr.status === 200) {
            resolve(xhr.responseText);
          }
        };
        xhr.open("GET", cssUrl);
        xhr.send();
      });
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
      display: flex;
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
