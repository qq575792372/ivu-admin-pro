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
      <!-- 主题模式 -->
      <Divider size="small">主题模式</Divider>
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
      showSettings: true,
      messageLoading: null, // 加载提示
      // 主色和转换后的样式，默认从缓存取
      primaryColor: getSessionStorage("ivu-theme-color") || "#2d8cf0",
      cssText: getSessionStorage("ivu-theme-css") || "",
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
    // 切换主题
    this.onChangeTheme();

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
      if (mode) {
        this.messageLoading = this.$Message.loading({
          content: "正在切换主题模式..",
          duration: 0,
        });
      }
      mode = mode || getSessionStorage("ivu-theme-mode") || this.themeMode;
      this.$store.dispatch("layout/settings/changeThemeMode", mode);
      setSessionStorage("ivu-theme-mode", mode);
      document.documentElement.setAttribute("theme-mode", mode);
      setTimeout(this.messageLoading, 1000);
    },

    /**
     * 改变主题颜色
     */
    async onChangeColor(color) {
      if (color) {
        this.messageLoading = this.$Message.loading({
          content: "正在切换主题色..",
          duration: 0,
        });
      }

      // 设置新的主题色
      this.primaryColor = color;
      // 将选择的颜色保存到缓存中
      setSessionStorage("ivu-theme-color", color);

      // 没有获取过iview样式，从第三发拉取，并转换样式数据
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
        "primary-darken-color": "#2b85e4", // 加重颜色
        "primary-lighten20": "#57a3f3", // 减轻20%
        "primary-lighten80": "#d5e8fc", // 减轻80%
        "primary-lighten90": "#eaf4fe", // 减轻90%
        "primary-lighten95": "#f0faff", // 减轻95%
      };

      for (let key in oldThemeColors) {
        let reg = new RegExp(oldThemeColors[key], "g");
        cssText = cssText
          .replace(reg, "var(--" + key + ")")
          .replace(/\f/g, "\\f");
      }
      // 将转换后的样式缓存
      setSessionStorage("ivu-theme-css", cssText);
      // 设置css文本样式
      this.cssText = cssText;
    },

    /**
     * 生成颜色
     * @todo 后续找个第三方的包，根据主色生成不同饱和度的颜色
     */
    transThemeColor() {
      // hex颜色转为rgba
      let primaryColor = hexToRgb(this.primaryColor);
      const rgbaNumber = primaryColor
        .replace("rgb(", "")
        .replace(")", "")
        .split(",");

      let transThemeInfo = {
        "primary-color": [...rgbaNumber].map(Number),
        "primary-darken-color": [...rgbaNumber].map(Number),
        "primary-lighten20": [...rgbaNumber].map(Number),
        "primary-lighten80": [...rgbaNumber].map(Number),
        "primary-lighten90": [...rgbaNumber].map(Number),
        "primary-lighten95": [...rgbaNumber].map(Number),
      };
      // 颜色饱和度
      for (let i = 0; i < 3; i++) {
        transThemeInfo["primary-darken-color"][i] = Math.ceil(
          transThemeInfo["primary-darken-color"][i] -
            transThemeInfo["primary-darken-color"][i] * 0.06
        );
        transThemeInfo["primary-lighten20"][i] = Math.ceil(
          transThemeInfo["primary-lighten20"][i] +
            255 * 0.2 -
            transThemeInfo["primary-lighten20"][i] * 0.2
        );
        transThemeInfo["primary-lighten80"][i] = Math.ceil(
          transThemeInfo["primary-lighten80"][i] +
            255 * 0.8 -
            transThemeInfo["primary-lighten80"][i] * 0.8
        );
        transThemeInfo["primary-lighten90"][i] = Math.ceil(
          transThemeInfo["primary-lighten90"][i] +
            255 * 0.9 -
            transThemeInfo["primary-lighten90"][i] * 0.9
        );
        transThemeInfo["primary-lighten95"][i] = Math.ceil(
          transThemeInfo["primary-lighten95"][i] +
            255 * 0.95 -
            transThemeInfo["primary-lighten95"][i] * 0.95
        );
      }

      // 将var变量添加到style中
      document.documentElement.setAttribute("theme-color", this.primaryColor);
      let styleSheet = document.getElementById("ivu-theme-root-style");
      if (!styleSheet) {
        styleSheet = document.createElement("style");
        styleSheet.id = "ivu-theme-root-style";
        styleSheet.type = "text/css";
        document.head.appendChild(styleSheet);
      }
      styleSheet.innerText = `:root {
        --primary-color: ${rgbToHex(
          "rgb(" + transThemeInfo["primary-color"].join() + ")"
        )};
        --primary-darken-color: ${rgbToHex(
          "rgba(" + transThemeInfo["primary-darken-color"].join() + ")"
        )};
        --primary-lighten20: ${rgbToHex(
          "rgba(" + transThemeInfo["primary-lighten20"].join() + ")"
        )};
        --primary-lighten80: ${rgbToHex(
          "rgba(" + transThemeInfo["primary-lighten80"].join() + ")"
        )};
        --primary-lighten90: ${rgbToHex(
          "rgba(" + transThemeInfo["primary-lighten90"].join() + ")"
        )};
        --primary-lighten95: ${rgbToHex(
          "rgba(" + transThemeInfo["primary-lighten95"].join() + ")"
        )};
      }`;
    },

    /**
     * 生成样式
     */
    renderIviewCss() {
      if (!this.cssText) return;
      let styleTag = document.getElementById("ivu-theme-chalk-style");
      if (!styleTag) {
        styleTag = document.createElement("style");
        styleTag.id = "ivu-theme-chalk-style";
        styleTag.type = "text/css";
        document.head.append(styleTag);
      }
      styleTag.innerText = this.cssText;
      // 所有处理完，关闭loading
      setTimeout(this.messageLoading, 1000);
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
          } else {
            // 请求失败关闭loading
            setTimeout(this.messageLoading, 1000);
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
