const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");


module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          "style-loader",          
          {
            loader: 'css-loader',
            options: { url: false },
          }
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ["babel-loader"]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "src", "index.html")
    }),
    new CopyPlugin({
      patterns: [
        { from: "assets", to: "assets" },
        { from: "api", to: "api" },
      ],
    }),
  ]
};