const babel = require('rollup-plugin-babel')
const resolve = require('rollup-plugin-node-resolve')
const commonjs = require('rollup-plugin-commonjs') // 与 Babel 插件冲突
// const json = require('rollup-plugin-json')
const { terser } = require('rollup-plugin-terser')
const vue = require('rollup-plugin-vue')
const postcss = require('rollup-plugin-postcss')
const px2vw = require('@moohng/postcss-px2vw')
const autoprefixer = require('autoprefixer')

module.exports = {
  plugins: [
    resolve(),
    commonjs(), // 兼容 commonjs 规范的第三方模块使用 ES6 方式导入
    // json(),
    postcss({
      extract: true,
      minimize: true,
      plugins: [px2vw(), autoprefixer()],
    }),
    vue({
      css: false,
      preprocessOptions: ['scss'],
    }),
    babel({
      babelrc: false, // 忽略项目中的babel配置文件，使用此配置
      presets: [
        [
          '@babel/preset-env',
          {
            modules: false,
            useBuiltIns: 'usage',
            corejs: '2',
          }
        ]
      ],
      plugins: [
        "@babel/plugin-proposal-nullish-coalescing-operator",
        "@babel/plugin-proposal-optional-chaining",
      ],
      exclude: 'node_modules/**',
    }),
    terser(),
  ],
}
