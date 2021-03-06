const path = require('path')
const autoprefixer = require('autoprefixer')

function addStyleResource(rule) {
  rule
    .use('style-resource')
    .loader('style-resources-loader')
    .options({
      patterns: [
        path.resolve(__dirname, './src/components/style/vars.scss'),
        path.resolve(__dirname, './src/components/style/mixins.scss'),
      ],
    })
}

module.exports = {
  outputDir: 'gh-pages',
  configureWebpack: {
    output: {
      libraryExport: 'default',
    },
  },
  chainWebpack: (config) => {
    const types = ['vue-modules', 'vue', 'normal-modules', 'normal']
    types.forEach((type) => addStyleResource(config.module.rule('scss').oneOf(type)))
  },
  css: {
    loaderOptions: {
      postcss: {
        plugins: [autoprefixer()],
      },
    },
  },
}
