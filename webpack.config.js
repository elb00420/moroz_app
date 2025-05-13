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
          static: path.join(__dirname, "dist"), // Путь к директории, где будет храниться статический контент
        },
      }
    : {};

module.exports = (end, argv) => ({
  mode: argv.mode === "development" ? "development" : "production",
  devtool: argv.mode === "development" ? "inline-source-map" : false,
  ...devServer(argv.mode === "development"),
  entry: "./src/script.ts", // Ваш основной TS файл
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
    path: path.resolve(__dirname, "dist"), // Указываем папку для вывода
    clean: true,
    publicPath: "/", // Путь к статическим ресурсам
  },
  plugins: [
    // Указываем правильный путь к index.html
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "index.html"), // Путь к файлу index.html в корне
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "src/assets"), // Путь к папке assets
          to: "assets", // Куда скопировать
        },
        {
          from: path.resolve(__dirname, "src/404.html"), // Путь к файлу 404.html
          to: "404.html",
        },
      ],
    }),
    new MiniCssPlugin({ filename: "style.css" }),
  ],
});
