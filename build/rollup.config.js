import babel from '@rollup/plugin-babel'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import { terser } from 'rollup-plugin-terser'
import vue from 'rollup-plugin-vue'
import postcss from 'rollup-plugin-postcss'
import px2vw from '@moohng/postcss-px2vw'
import autoprefixer from 'autoprefixer'
import del from 'del'

import loadEntries from './loadEntries'

const entries = [
  ...loadEntries(),
  { name: 'dui', input: 'src/components/dui.js' },
  { name: 'dui.base', input: 'src/styles/base.scss' },
]

function jsConfig(name, input) {
  const basePlugins = [
    resolve(),
    commonjs(), // 兼容 commonjs 规范的第三方模块使用 ES6 方式导入
    vue({
      css: false,
    }),
  ]
  return [{
    input,
    output: {
      file: `dist/${name}.min.js`,
      format: 'umd',
      name,
    },
    plugins: basePlugins.concat([
      postcss({
        extract: `${name}.min.css`,
        minimize: true,
        plugins: [px2vw({
          viewportWidth: 375,
          rootValue: false,
        }), autoprefixer()],
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
    ]),
  }, {
    input,
    output: {
      file: name === 'dui.base' ? `lib/dui/${name}.js` : `lib/${name}/index.js`,
      format: 'es',
      name,
    },
    plugins: basePlugins.concat([
      postcss({
        extract: `${name}.css`,
        // minimize: true,
        plugins: [
          px2vw({
            viewportWidth: 375,
            rootValue: false,
          }),
          autoprefixer(),
        ],
      }),
    ])
  }]
}

del(['dist', 'lib'])

module.exports = entries.reduce((results, { name, input }) => {
  if (input) {
    results = results.concat(jsConfig(name, input))
  }
  return results
}, [])
