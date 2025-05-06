const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  configureWebpack: {
    output: {
      filename: "user-management/user-management.js",
      libraryTarget: "system",
    },
  },
  transpileDependencies: true,
  css: {
    extract: false,
  },
});
