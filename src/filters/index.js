import { formatThousand } from "@lime-util/util";

/**
 * 格式化数字千分位
 * @param {Number,String} val 参数
 * @returns {String} 返回格式化后的值
 */
const thousand = (val) => {
  return formatThousand(val);
};

/**
 * 安装所有过滤器
 */
const install = function (Vue) {
  Vue.filters("formatThousand", thousand);
};

// 导出
export default install;
