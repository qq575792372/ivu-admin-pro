/**
 * v-input-trim 输入框去所有空格指令
 * 支持input和textarea
 */

/**
 * 过滤所有空格
 * @param {String} value
 * @returns {String} 返回处理的值
 */
function filterInputTrim(value) {
  return value.replace(/\s+/g, "");
}

/**
 * 处理输入框事件
 * @param {Element} input 当前输入框元素
 * @param {VNode} vNode 节点
 * @returns {String} 返回处理的值
 */
function handleInputEvent(input, vNode) {
  let value = filterInputTrim(input.value);
  input.value = value;
  // 自定义组件传递参数
  vNode.componentInstance && vNode.componentInstance.$emit("input", value);
}

// 导出
export default {
  inserted(el, binding, vNode) {
    const input = el.querySelector("input") || el.querySelector("textarea");

    // 监听输入
    input.oninput = (event) => {
      handleInputEvent(input, vNode);
    };

    // 监听失去焦点
    input.onblur = (event) => {
      handleInputEvent(input, vNode);
    };
  },
};
