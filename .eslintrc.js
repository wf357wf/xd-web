module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  rules: {
    'no-console': 'off',
    'no-debugger': 'off',
    'vue/no-parsing-error': 'off'
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
