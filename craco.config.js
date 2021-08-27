const path = require("path");
const { getLoaders, loaderByName } = require("@craco/craco");
const root = (_path) => path.resolve(__dirname, _path);
const sleep = (time) => new Promise((resolve) => setTimeout(resolve, time));
module.exports = {
  babel: {
    plugins: [
      [
        "styled-jsx/babel",
        {
          plugins: [
            [
              "@styled-jsx/plugin-sass",
              {
                sassOptions: {
                  includePaths: ["./src/styles"],
                  data: '@import "var.scss";',
                },
              },
            ],
          ],
        },
      ],
      ["import", { libraryName: "antd", libraryDirectory: "es", style: "css" }],
    ],
  },
  webpack: {
    alias: {
      "@": root("src"),
    },

    configure(config) {
      config.resolve.extensions = [".ts", ".tsx", ".js", ".jsx", ".json"];
      return config;
    },
  },
  devServer(dev) {
    dev.proxy = {
      "/api/*": {
        target: "https://",
      },
    };

    dev.before = function (app) {
      app.get("/api/user/info", async (req, res) => {
        await sleep(1000);
        res.json({
          code: 0,
          data: {
            funcCodes: ["123", "124"],
            name: "跃渊",
            avatar: "",
          },
        });
      });
    };

    return dev;
  },
  plugins: [
    {
      plugin: {
        overrideWebpackConfig: ({
          webpackConfig,
          cracoConfig,
          pluginOptions,
          context: { env, paths },
        }) => {
          // cra的loader列表,
          // oneOf中遇到的第一个将会处理相应文件
          // 最后一个是file-loader兜底,因此在它之前插入即可
          const list = webpackConfig.module.rules[1].oneOf;
          list.splice(list.length - 2, 0, {
            test: /\.svg$/,
            include: root("src/icons"),
            loader: "svg-sprite-loader",
          });

          return webpackConfig;
        },
      },
      options: {},
    },
  ],
};
