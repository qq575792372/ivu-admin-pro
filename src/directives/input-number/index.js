/**
 * v-input-number 数字输入指令
 * 支持输入整数，最多两位小数
 */

/**
 * 输入事件
 * @param {Number} value
 * @returns {NUmber} 返回处理的值
 */
function handleInput(value) {
  // 清除"数字"和"."以外的字符
  value = value.replace(/[^\d.]/g, "");
  // 第一个字符如果是“.”，则清除掉
  value = value.replace(/^\./g, "");
  // 只保留第一个"."，清除多余的
  value = value.replace(/\.{2,}/g, "");
  // 保证“.”只能出现一次
  value = value.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
  // 最多只能输入两位小数
  value = value.replace(/^(-)*(\d+)\.(\d\d).*$/, "$1$2.$3");
  if (value.indexOf(".") < 0 && value !== "") {
    value = parseFloat(value);
  }
  return value;
}

/**
 * 失去焦点事件
 * @param {Number} value
 * @returns {NUmber} 返回处理的值
 */
function handleBlur(value) {
  value = String(value);
  // 检查最后一位不能是"."结尾
  if (value.charAt(value.length - 1) === ".") {
    value = value.substring(0, value.length - 1);
  }
  return value;
}

// 导出
export default {
  inserted(el, binding, vNode) {
    const input = el.querySelector("input");

    // 监听输入
    input.oninput = (event) => {
      let value = handleInput(input.value);
      input.value = value;
      // 自定义组件传递参数
      vNode.componentInstance && vNode.componentInstance.$emit("input", value);
    };

    // 监听失去焦点
    input.onblur = (event) => {
      let value = handleBlur(input.value);
      input.value = value;
      // 自定义组件传递参数
      vNode.componentInstance && vNode.componentInstance.$emit("input", value);
    };
  },
};
