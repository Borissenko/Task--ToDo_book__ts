module.exports = {
  css: {
    loaderOptions: {
      scss: {
        prependData: `@import "~@/assets/styles/main.scss";`
      },
      // css: {
      // options here will be passed to css-loader
      // },
      // postcss: {
      // options here will be passed to postcss-loader
      // }
    }
  }
};