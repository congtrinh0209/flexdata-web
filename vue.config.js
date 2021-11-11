
module.exports = {
  publicPath: process.env.NODE_ENV === 'haugiang'
  ? '/sso/'
  : '/',
  outputDir: 'src/main/webapp',
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
        $public-path: ${process.env.VUE_APP_PULIC_PATH};
        `
      },
      sass: {
        additionalData: `
        $base-color: ${process.env.VUE_APP_BASE_COLOR}
        $app-name: ${process.env.NODE_ENV}
        $public-path: ${process.env.VUE_APP_PULIC_PATH}
        `
      }
    }
  },
  transpileDependencies: [
    'vuetify'
  ]
}
