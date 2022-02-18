"use strict";
const path = require("path");
const defaultSettings = require("./src/settings.js");

// 转换路径
function resolve(dir) {
  return path.join(__dirname, dir);
}

// page title
const name = defaultSettings.title;

// dev port
// you can change the port > npm run dev --port=8000
const port = process.env.port || process.env.npm_config_port || 9000;

// All configuration item explanations can be find in https://cli.vuejs.org/config/
module.exports = {
  publicPath: "/", // 服务部署后访问路径前缀，默认“/”
  outputDir: "dist",
  assetsDir: "static",
  // lintOnSave: process.env.NODE_ENV === 'development',
  lintOnSave: false,
  runtimeCompiler: true, // 支持运行时模板方式编译
  productionSourceMap: process.env.NODE_ENV === "development" ? true : false, // 开发环境会开启sourceMap
  devServer: {
    port: port,
    open: true,
    // 配置反向代理，以及不同用法
    /*
    proxy: {
      "/api": {
        target: "http://192.168.0.18:8080",
        changeOrigin: true,
        pathRewrite: {
          "^/api": "/" // 例如 /api/a/b 请求是以api开头的，实际代理后请求为：/a/b
        }
      },
      "/foo": {
        target: "http://192.168.0.18:8080",
        changeOrigin: true,
        pathRewrite: {
          "^/foo": "/foo" // 例如 /foo/a/b 请求是以foo开头的，实际代理后请求为：foo/a/b
        }
      }
    },
    */
    overlay: {
      warnings: false,
      errors: true,
    },
    // 引入mock服务，如果正式联调后不需要，可以注释掉
    before: require("./mock/mock-server.js"),
  },
  configureWebpack: {
    // provide the app's title in webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    name: name,
    resolve: {
      alias: {
        "@": resolve("src"),
      },
    },
  },
  chainWebpack: (config) => {
    // it can improve the speed of the first screen, it is recommended to turn on preload
    config.plugin("preload").tap(() => [
      {
        rel: "preload",
        // to ignore runtime.js
        // https://github.com/vuejs/vue-cli/blob/dev/packages/@vue/cli-service/lib/config/app.js#L171
        fileBlacklist: [/\.map$/, /hot-update\.js$/, /runtime\..*\.js$/],
        include: "initial",
      },
    ]);

    // when there are many pages, it will cause too many meaningless requests
    config.plugins.delete("prefetch");

    // set svg-sprite-loader
    config.module.rule("svg").exclude.add(resolve("src/icons")).end();
    config.module
      .rule("icons")
      .test(/\.svg$/)
      .include.add(resolve("src/icons"))
      .end()
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({
        symbolId: "svg-icon-[name]",
      })
      .end();

    // not development
    config.when(process.env.NODE_ENV !== "development", (config) => {
      config
        .plugin("ScriptExtHtmlWebpackPlugin")
        .after("html")
        .use("script-ext-html-webpack-plugin", [
          {
            // `runtime` must same as runtimeChunk name. default is `runtime`
            inline: /runtime\..*\.js$/,
          },
        ])
        .end();

      // config optimization
      config.optimization.splitChunks({
        chunks: "all",
        cacheGroups: {
          libs: {
            name: "chunk-libs",
            test: /[\\/]node_modules[\\/]/,
            priority: 10,
            chunks: "initial",
          },
          elementUI: {
            name: "chunk-elementUI", // split elementUI into a single package
            priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
            test: /[\\/]node_modules[\\/]_?element-ui(.*)/,
          },
          antDesignUI: {
            name: "chunk-antDesignUI", // split antDesignUI into a single package
            priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
            test: /[\\/]node_modules[\\/]_?ant-design(.*)/, // in order to adapt to cnpm
          },
          viewDesignUI: {
            name: "chunk-viewDesignUI", // split viewDesignUI into a single package
            priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
            test: /[\\/]node_modules[\\/]_?view-design(.*)/,
          },
          vantUI: {
            name: "chunk-vantUI", // split vantUI into a single package
            priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
            test: /[\\/]node_modules[\\/]_?vant(.*)/,
          },
          echarts: {
            name: "chunk-echarts",
            test: /[\\/]node_modules[\\/](vue-)?echarts[\\/]/,
            priority: 5,
          },
          styles: {
            name: "styles", // split styles
            test: /\.(le|sa|sc|c)ss$/,
            priority: 5,
          },
          commons: {
            name: "chunk-commons",
            test: resolve("src/components"), // can customize your rules
            minChunks: 3, //  minimum common number
            priority: 5,
            reuseExistingChunk: true,
          },
        },
      });
      // https:// webpack.js.org/configuration/optimization/#optimizationruntimechunk
      config.optimization.runtimeChunk("single");
    });
  },
  css: {
    loaderOptions: {
      less: {
        modifyVars: {},
        javascriptEnabled: true,
      },
    },
  },
};
