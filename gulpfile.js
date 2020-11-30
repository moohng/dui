const { series, parallel, src, dest } = require('gulp')
const del = require('del')
const rename = require('gulp-rename')
const postcss = require('gulp-postcss')
const autoprefixer = require('autoprefixer')
const sass = require('gulp-sass')
// const cleanCSS = require('gulp-clean-css')
const rollup = require('rollup')

const rollupConfig = require('./build/rollup.config')

const base = 'src/components'

function cssLib(cb) {
  src([
    'src/components/style.scss',
    'src/components/**/style/index.scss',
  ], {
    base,
  }).pipe(sass({
      outputStyle: 'expanded',
    }))
    .pipe(postcss([
      autoprefixer(),
    ]))
    .pipe(rename(function (path) {
      if (path.dirname === 'style') {  // base 样式
        path.basename = 'base'
      } else if (path.basename === 'style') { // 所有样式
        path.basename = 'index'
        path.dirname += '/style'
      }
    }))
    .pipe(dest('lib'))

  cb()
}

function cssMin(cb) {
  src([
    'src/components/style.scss',
    'src/components/**/style/index.scss',
  ]).pipe(sass({
      outputStyle: 'compressed',
    }))
    .pipe(postcss([
      autoprefixer(),
    ]))
    .pipe(rename(function (path) {
      if (path.basename === 'style') { // 所有样式
        path.basename = 'dui.min'
      } else if (path.dirname === 'style') {  // base 样式
        path.basename = 'dui.base.min'
      } else {
        path.basename = path.dirname.match(/^(\w+)[/\\]/)[1] + '.min'
      }
      path.dirname = '.'
    }))
    .pipe(dest('dist'))

  cb()
}

function createRollupTask(rollupConfig) {
  return rollupConfig.map(config => {
    const { output: outputConfig, ...inputConfig} = config
    return function task () {
      return rollup.rollup(inputConfig).then(bundle => {
        return bundle.write(outputConfig)
      })
    }
  })
}

function clean() {
  return del(['dist', 'lib'])
}

exports.build = series(clean, parallel(cssLib, cssMin, ...createRollupTask(rollupConfig)))
