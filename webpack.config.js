const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const SpriteLoaderPlugin = require("svg-sprite-loader/plugin");
const CopyPlugin = require("copy-webpack-plugin");
const globImporter = require("node-sass-glob-importer");
const path = require("path");
const SRC_DIR = __dirname + "/src";
const DIST_DIR = __dirname + "/build";

module.exports = (env) => {
  return {
    devtool: "source-map",
    entry: [SRC_DIR + "/index.js", SRC_DIR + "/styles/index.scss"],
    output: {
      path: DIST_DIR,
      publicPath: "/",
      filename: "bundle.js",
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
          },
        },
        {
          test: /\.(scss|sass|css)$/,
          exclude: /node_modules/,
          loaders: [
            "css-hot-loader",
            MiniCssExtractPlugin.loader,
            {
              loader: "css-loader",
              options: {
                sourceMap: true,
                importLoaders: 1,
              },
            },
            {
              loader: "sass-loader",
              options: {
                importer: globImporter(),
              },
            },
          ],
        },
        {
          test: /\.(html)$/,
          exclude: /node_modules/,
          use: {
            loader: "html-loader",
            options: { minimize: true },
          },
        },
        {
          test: /\.svg$/,
          use: [
            "svg-sprite-loader",
            {
              loader: "svgo-loader",
              options: {
                convertColors: {
                  shorthex: false,
                },
              },
            },
          ],
        },
      ],
    },
    resolve: {
      extensions: ["*", ".js", ".jsx"],
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new HtmlWebpackPlugin({
        template: SRC_DIR + "/index.html",
      }),
      new MiniCssExtractPlugin({
        filename: env.NODE_ENV ? "[name].css" : "[name].[hash].css",
        chunkFilename: env.NODE_ENV ? "[id].css" : "[id].[hash].css",
      }),
      new webpack.DefinePlugin({
        NODE_ENV: JSON.stringify(env.NODE_ENV),
      }),
      new SpriteLoaderPlugin(),
      new CopyPlugin([{ from: "src/fonts", to: "fonts" }]),
    ],
    devServer: {
      contentBase: DIST_DIR,
      hot: true,
      port: 9000,
      open: true,
      publicPath: "/",
      historyApiFallback: true,
    },
  };
};
