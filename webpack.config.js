const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin =  require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
    entry : './src/index.js',
    output : {
        path : path.resolve(__dirname , 'dist'),
        filename: 'index.js'
    },
    module : {
        rules : [
          {
            test: /\.(js|jsx)$/, use:'babel-loader'
          },
          {
            test: /.(css|scss)$/, 
            use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]
          },
          {
            test: /.(jpg|jpeg|png|gif|mp3|svg)$/,
            use: [
              {
                loader: "file-loader",
                options: {
                  name: "[path][name]-[hash:8].[ext]"
                }
              }
            ]
          },
          {
            test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
            use: [
              {
                loader: 'file-loader',
                options: {
                  name: '[name].[ext]',
                  outputPath: 'fonts/'
                }
              }
            ]
          }
        ]
    },
    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        filename: 'index.html',
        inject: true,
        template: path.resolve(__dirname, 'src', 'index.html'),
      }),
      new MiniCssExtractPlugin({
        filename: "[name].css",
        chunkFilename: "[id].css"
      }),
    ],
    optimization: {
      minimizer: [
        new OptimizeCssAssetsPlugin({
          cssProcessorOptions: {
            map: {
              inline: false,
              annotation: true,
            },
          },
        }),
        new TerserPlugin({
          parallel: true,
          cache: true,
          sourceMap: true,
        }),
      ],
    },
};