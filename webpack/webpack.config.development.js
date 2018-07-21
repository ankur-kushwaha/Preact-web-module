const merge = require("webpack-merge");
const webpack = require("webpack");
const config = require("./webpack.config.base");

const GLOBALS = {
  "process.env": {
    NODE_ENV: JSON.stringify("development")
  },
  __DEV__: JSON.stringify(JSON.parse(process.env.DEBUG || "true"))
};

module.exports = merge(config, {
  devtool: "source-map",
  entry: {
    application: [
      "client/js/index"
    ]
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      debug: true,
      cache: true
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin(GLOBALS)
  ]
});
