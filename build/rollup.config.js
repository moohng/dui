import babel from '@rollup/plugin-babel'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import { terser } from 'rollup-plugin-terser'
import vue from 'rollup-plugin-vue'
import postcss from 'rollup-plugin-postcss'
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
    babel({
      babelrc: false, // 忽略项目中的babel配置文件，使用此配置
      presets: [
        [
          '@babel/preset-env',
          {
            modules: false,
            useBuiltIns: false,
          }
        ]
      ],
      plugins: [
        '@babel/plugin-proposal-nullish-coalescing-operator',
        '@babel/plugin-proposal-optional-chaining',
        ['@babel/plugin-transform-runtime', {
          corejs: 3,
        }],
      ],
      exclude: 'node_modules/**',
      babelHelpers: 'runtime',
    }),
  ]
  return [
    {
      input,
      output: {
        file: `dist/${name}.min.js`,
        format: 'iife',
        name,
        plugins: [terser()],
        extend: true,
      },
      plugins: basePlugins.concat([
        postcss({
          extract: `${name}.min.css`,
          minimize: true,
          plugins: [
            autoprefixer(),
          ],
        }),
      ]),
    },
    {
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
            autoprefixer(),
          ],
        }),
      ]),
    },
  ]
}

del(['dist', 'lib'])

module.exports = entries.reduce((results, { name, input }) => {
  if (input) {
    results = results.concat(jsConfig(name, input))
  }
  return results
}, [])
