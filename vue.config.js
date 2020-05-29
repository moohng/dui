const path = require('path');
const px2vw = require('@moohng/postcss-px2vw');

function addStyleResource(rule) {
  rule.use('style-resource')
    .loader('style-resources-loader')
    .options({
      patterns: [
        path.resolve(__dirname, './src/styles/vars.scss'),
        path.resolve(__dirname, './src/styles/mixins.scss'),
      ],
    });
}

module.exports = {
  outputDir: 'gh-pages',
  configureWebpack: {
    output: {
      libraryExport: 'default',
    },
  },
  chainWebpack: (config) => {
    const types = ['vue-modules', 'vue', 'normal-modules', 'normal'];
    types.forEach((type) => addStyleResource(config.module.rule('scss').oneOf(type)));
  },
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          px2vw({
            viewportWidth: 375,
            rootValue: false,
          }),
        ],
      },
    },
  },
};
