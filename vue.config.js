const { defineConfig } = require('@vue/cli-service')
module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8088', // 目标服务器地址
        changeOrigin: true, // 是否改变域名
        pathRewrite: {
          '^/api': '' // 重写路径
        }
      }
    }
  },
  chainWebpack: config => {
    config.plugin('define').tap((definitions) => {
      Object.assign(definitions[0], {
        __VUE_OPTIONS_API__: true,
        __VUE_PROD_DEVTOOLS__: false,
        __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: false
      })
      return definitions
    })
  }
}