const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  output: {
    filename: 'main-[hash:8].js',
    publicPath: '/'
  }, 

  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },

  module: {
    rules :[
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },

      // Настройка картинок
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader']
      },

      // Настройка картинок
      {
        test: /\.(png|jpg|jpeg|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'images',
              name: '[name]-[sha1:hash:7].[ext]'
            }
          }
        ]
      },

      // Настройка шрифтов
      {
        test: /\.(woff|woff2)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'fonts',
              name: '[name].[ext]'
            }
          }
        ]
      },
    ]
  },

  devServer: {
    open: true,
    contentBase: "./dist",
    historyApiFallback: true
  },

  plugins: [
    new HtmlWebpackPlugin({
      favicon: "./src/sudoku.ico",
      template: "./src/index.html"
    }),
    new CleanWebpackPlugin()
  ]
}