import Vue from "vue";
import SvgIcon from "@/components/SvgIcon";

// 注册全局组件
Vue.component("SvgIcon", SvgIcon);

// 导入src/icons/svg下所有的svg图标
const req = require.context("./svg", false, /\.svg$/);
const requireAll = requireContext => requireContext.keys().map(requireContext);
requireAll(req);
