module.exports = {
  // 配置代理
  devServer: {
    // proxy: {
    //   "/api": {
    //     target: "http://yunqiaoke.sinmore.vip",
    //     changeOrigin: true // needed for virtual hosted sites
    //   }
    // }
    proxy: "http://yunqiaoke.sinmore.vip"
  },
  css: {
    loaderOptions: {
      postcss: {
        // 这是rem适配的配置  注意： remUnit在这里要根据lib-flexible的规则来配制，如果您的设计稿是750px的，用75就刚刚好。
        plugins: [
          require("postcss-px2rem-exclude")({
            remUnit: 112.5,
            // 不编译第三方ui插件
            exclude: /node_modules/i
          })
        ]
      }
    }
  }
};
