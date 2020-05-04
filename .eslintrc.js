module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    jest: true,
  },
  extends: 'airbnb-base',
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    sourceType: 'module',
  },
  rules: {
    indent: ['error', 2],
    'linebreak-style': 0,
    quotes: ['error', 'single'],
    'max-len': ['error', 120],
    'arrow-parens': 0,
    'no-param-reassign': 0,
  },
}
