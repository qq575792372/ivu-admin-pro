/**
 * eslint配置
 */
module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:vue/recommended",
    "plugin:prettier/recommended",
  ],
  rules: {
    /* 常规规则 */
    "spaced-comment": [2, "always"], // 注释后面必须写两个空格
    "no-unused-vars": "off", // 忽略未使用的变量
    "no-unreachable": "off", // 忽略return后未执行代码的提示
    "no-empty": "off", // 忽略代码必须返回结果的限制

    /* vue规则 */
    "vue/no-unused-components": "off", // vue忽略未使用组件提示
    "vue/no-unused-vars": "off", // vue忽略未使用的变量
    "vue/return-in-computed-property": "off", // vue忽略函数必须返回值
    "vue/multi-word-component-names": "off", // vue忽略文件名建议的短横单词分割
  },
};
