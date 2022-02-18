/**
 * ESlint 检查配置
 */
module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es6: true
  },
  parserOptions: {
    parser: "babel-eslint"
  },
  extends: ["plugin:vue/recommended", "eslint:recommended"],
  rules: {
    "no-unused-vars": "off",
    "vue/no-unused-components": "off"
  }
};
