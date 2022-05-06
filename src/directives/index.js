/**
 * 指令集合
 */
import permission from "./permission";

/**
 * 按照所有指令
 */
const install = function (Vue) {
  Vue.directive("permission", permission);
};

// 导出
export default install;
