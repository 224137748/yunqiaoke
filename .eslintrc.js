module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ["plugin:vue/essential", "@vue/standard"],
  rules: {
    // 'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    semi: ["error", "always"],
    indent: 2,
    // 检查js 双引号
    quotes: [1, "double"],
    // 函数前面不检验空格
    "space-before-function-paren": 0,
    "computed-property-spacing": 0
  },
  parserOptions: {
    parser: "babel-eslint"
  }
};
