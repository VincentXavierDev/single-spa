const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  configureWebpack: {
    output: {
      filename: "order-management/order-management.js",
      libraryTarget: "system",
    },
  },
  transpileDependencies: true
})
