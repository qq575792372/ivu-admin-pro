// ESlint 检查配置
module.exports = {
  root: true,
  parserOptions: {
    parser: "babel-eslint"
  },
  env: {
    browser: true,
    node: true,
    es6: true
  },
  extends: ["plugin:vue/recommended", "eslint:recommended"],
  rules: {
    "no-unused-vars": "off",
    "vue/no-unused-components": "off"
  }
};
