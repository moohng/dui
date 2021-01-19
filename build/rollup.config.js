import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
const { babel } = require('@rollup/plugin-babel')
const { terser } = require('rollup-plugin-terser')
const vue = require('rollup-plugin-vue')
const postcss = require('rollup-plugin-postcss')
const autoprefixer = require('autoprefixer')

const loadEntries = require('./loadEntries')

const entries = [...loadEntries(), { name: 'dui', input: 'src/components/dui.ts' }]

const extensions = ['.ts', '.js', '.tsx', '.json']

function jsConfig(name, input) {
  const basePlugins = [
    babel({
      babelrc: false, // 忽略项目中的babel配置文件，使用此配置
      presets: ['@babel/preset-typescript'],
      plugins: [
        '@vue/babel-plugin-jsx',
        '@babel/plugin-proposal-nullish-coalescing-operator',
        '@babel/plugin-proposal-optional-chaining',
        [
          '@babel/plugin-transform-runtime',
          {
            corejs: 3,
          },
        ],
      ],
      exclude: 'node_modules/**',
      babelHelpers: 'runtime',
      extensions,
    }),
    vue({
      target: 'browser',
    }),
    resolve({
      extensions,
      // modulesOnly: true,
    }),
    commonjs({
      extensions,
    }), // 兼容 commonjs 规范的第三方模块使用 ES6 方式导入
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
        globals: {
          vue: 'Vue',
        },
      },
      plugins: basePlugins.concat([
        postcss({
          minimize: true,
          plugins: [autoprefixer()],
        }),
      ]),
      external: ['vue'],
    },
    {
      input,
      output: {
        file: name === 'dui' ? `lib/${name}.js` : `lib/${name}/index.js`,
        format: 'es',
        name,
        globals: {
          vue: 'Vue',
        },
      },
      plugins: basePlugins.concat([
        postcss({
          plugins: [autoprefixer()],
        }),
      ]),
      external: ['vue', /@babel\/runtime/],
    },
  ]
}

module.exports = entries.reduce((results, { name, input }) => {
  if (input) {
    results = results.concat(jsConfig(name, input))
  }
  return results
}, [])
