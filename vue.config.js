const webpack = require('webpack');
module.exports = {
  publicPath: '/',
  productionSourceMap: false,
  lintOnSave: false,
  devServer: {
    disableHostCheck: true,
  },
  transpileDependencies: [
    'vuetify'
  ]
}
