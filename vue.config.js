
module.exports = {
  publicPath: '/',
  productionSourceMap: false,
  lintOnSave: false,
  devServer: {
    disableHostCheck: true,
  },
  css: {
    loaderOptions: {
      scss: {
        additionalData: `
        $base-color: ${process.env.VUE_APP_BASE_COLOR};
        $app-name: ${process.env.NODE_ENV};
        `
      },
      sass: {
        additionalData: `
        $base-color: ${process.env.VUE_APP_BASE_COLOR}
        $app-name: ${process.env.NODE_ENV}
        `
      }
    }
  },
  transpileDependencies: [
    'vuetify'
  ]
}
