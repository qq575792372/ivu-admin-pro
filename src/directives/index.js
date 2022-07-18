/**
 * 指令集合
 */
import permission from "./permission";
import inputTrim from "./input-trim";
import inputNumber from "./input-number";

/**
 * 按照所有指令
 */
const install = function (Vue) {
  Vue.directive("permission", permission);
  Vue.directive("input-trim", inputTrim);
  Vue.directive("input-number", inputNumber);
};

// 导出
export default install;
