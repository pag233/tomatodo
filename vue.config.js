/* eslint-disable */
const fs = require('fs')
module.exports = {
  // devServer: {
  // https: {
  //   key: fs.readFileSync('./certs/example.com+5-key.pem'),
  //   cert: fs.readFileSync('./certs/example.com+5.pem'),
  // },
  // public: 'https://localhost:8080/',
  // },
  configureWebpack: {
    devtool: 'source-map',
  },
  css: {
    loaderOptions: {
      scss: {
        prependData: `
        @import "@/scss/_mixin.scss";
        @import "@/scss/_common.scss";
        `,
      },
    },
  },
}