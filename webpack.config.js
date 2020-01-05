const AntdDayjsWebpackPlugin = require("antd-dayjs-webpack-plugin");
const path = require('path');

module.exports = {
  entry: "./src/index.js",
  output: {
    path: __dirname + "/public",
    filename: "bundle.js"
  },
  devServer: {
    contentBase: __dirname + "/public"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.css$/i,
        use: ["style-loader","css-loader"]
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader" // translates CSS into CommonJS
          },
          {
            loader: "less-loader",
            options: {
              javascriptEnabled: true,
              modifyVars: {
                "@primary-color": "#ff7a45"
              }
            }
          }
        ]
      }
    ]
  },
  resolve: {
    alias: {
      "@ant-design/icons/lib/dist$": path.resolve(__dirname, "./src/icons.js")
    }
  },
  plugins: [new AntdDayjsWebpackPlugin()],
};
