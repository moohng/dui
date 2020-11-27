import babel from '@rollup/plugin-babel'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import { terser } from 'rollup-plugin-terser'
import vue from 'rollup-plugin-vue'
import postcss from 'rollup-plugin-postcss'
import autoprefixer from 'autoprefixer'

const loadEntries = require('./loadEntries')

const entries = [
  // ...loadEntries(),
  { name: 'dui', input: 'src/components/dui.js' },
]

function jsConfig(name, input) {
  const basePlugins = [
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
        '@vue/babel-plugin-jsx',
        '@babel/plugin-proposal-nullish-coalescing-operator',
        '@babel/plugin-proposal-optional-chaining',
        ['@babel/plugin-transform-runtime', {
          corejs: 3,
        }],
      ],
      exclude: 'node_modules/**',
      babelHelpers: 'runtime',
    }),
    vue({
      target: 'browser',
    }),
    resolve(),
    commonjs(), // 兼容 commonjs 规范的第三方模块使用 ES6 方式导入
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
          minimize: true,
          plugins: [
            autoprefixer(),
          ],
        }),
      ]),
      // external: ['vue'],
    },
    {
      input,
      output: {
        file: name === 'dui' ? `lib/${name}.js` : `lib/${name}/index.js`,
        format: 'es',
        name,
      },
      plugins: basePlugins.concat([
        postcss({
          plugins: [
            autoprefixer(),
          ],
        }),
      ]),
      // external: ['vue'],
    },
  ]
}

module.exports = entries.reduce((results, { name, input }) => {
  if (input) {
    results = results.concat(jsConfig(name, input))
  }
  return results
}, [])
