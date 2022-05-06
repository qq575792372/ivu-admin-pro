import store from "@/store";

/**
 * v-permission 权限指令
 * @description 通过指令方式判断，如果没有权限，则会移除节点
 */
function checkPermission(el, binding) {
  const { value } = binding;
  // 所有权限数组
  const permissions = store.getters.permissions;

  // 校验的权限必须是数组并且不为空
  if (value && value instanceof Array) {
    let hasPermission = value.some((code) => permissions.includes(code));
    if (!hasPermission) {
      // 没有权限则移除元素
      el.parentNode && el.parentNode.removeChild(el);
    }
  } else {
    throw new Error("权限编码必须是数组");
  }
}

// 导出
export default {
  inserted(el, binding) {
    checkPermission(el, binding);
  },
  update(el, binding) {
    checkPermission(el, binding);
  },
};
