import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
const { babel } = require('@rollup/plugin-babel')
const { terser } = require('rollup-plugin-terser')
const vue = require('rollup-plugin-vue')
const postcss = require('rollup-plugin-postcss')
const autoprefixer = require('autoprefixer')
const typescript = require('@rollup/plugin-typescript')
import jsx from 'acorn-jsx'
// import tsConfig from '../tsconfig.json'

const loadEntries = require('./loadEntries')

const entries = [
  ...loadEntries(),
  { name: 'dui', input: 'src/components/dui.ts' },
]

function jsConfig(name, input) {
  const basePlugins = [
    typescript({
      // ...tsConfig,
      module: 'commonjs',
      jsx: 'preserve',
      // lib: ['es5', 'es6', 'dom'],
      // target: 'es5',
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
    resolve({
      extensions: ['ts', 'js', 'tsx', 'json'],
    }),
    commonjs({
      extensions: ['ts', 'js', 'tsx', 'json'],
    }), // 兼容 commonjs 规范的第三方模块使用 ES6 方式导入
  ]
  return [
    {
      input,
      output: {
        file: `dist/${name}.min.js`,
        format: 'iife',
        name,
        // plugins: [terser()],
        extend: true,
        globals: {
          vue: 'Vue',
        },
      },
      plugins: basePlugins.concat([
        postcss({
          minimize: true,
          plugins: [
            autoprefixer(),
          ],
        }),
      ]),
      external: ['vue'],
      acornInjectPlugins: [jsx()],
    },
    // {
    //   input,
    //   output: {
    //     file: name === 'dui' ? `lib/${name}.js` : `lib/${name}/index.js`,
    //     format: 'es',
    //     name,
    //     globals: {
    //       vue: 'Vue',
    //     },
    //   },
    //   plugins: basePlugins.concat([
    //     postcss({
    //       plugins: [
    //         autoprefixer(),
    //       ],
    //     }),
    //   ]),
    //   external: ['vue'],
    //   acornInjectPlugins: [jsx()],
    // },
  ]
}

module.exports = entries.reduce((results, { name, input }) => {
  if (input) {
    results = results.concat(jsConfig(name, input))
  }
  return results
}, [])
