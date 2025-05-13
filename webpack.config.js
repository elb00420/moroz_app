const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const MiniCssPlugin = require("mini-css-extract-plugin");

const devServer = (isDev) =>
  isDev
    ? {
        devServer: {
          open: true,
          hot: true,
          port: 8080,
          static: path.join(__dirname, "dist"),
        },
      }
    : {};

module.exports = (end, argv) => ({
  mode: argv.mode === "development" ? "development" : "production",
  devtool: argv.mode === "development" ? "inline-source-map" : false,
  ...devServer(argv.mode === "development"),
  entry: "./src/script.ts",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/i,
        use: [
          MiniCssPlugin.loader,
          {
            loader: "css-loader",
            options: {
              url: false,
            },
          },
          "sass-loader",
        ],
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  output: {
    filename: "script.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
    publicPath: "/moroz_app/", // Устанавливаем публичный путь для GitHub Pages (путь к подкаталогу)
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "index.html"),
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "src/assets"),
          to: "assets",
        },
        {
          from: path.resolve(__dirname, "src/404.html"),
          to: "404.html",
        },
      ],
    }),
    new MiniCssPlugin({ filename: "style.css" }),
  ],
});
