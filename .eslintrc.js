module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
    jquery: true,
  },
  extends: [
    'plugin:vue/recommended',
    // 'eslint:recommended',
    'prettier/vue',
    'plugin:prettier/recommended',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    parser: 'babel-eslint',
  },
  rules: {
    'no-unused-vars': 'warn',
  },
}
