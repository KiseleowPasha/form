const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
//const CopyWebpackPlugin = require("copy-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = {
    target: ['web', 'es5'],
    watch: true,
    entry: {
      bundle: './index.js',
    },
    devServer: {
      historyApiFallback: true,
    },
    module: {
        rules: [
          { test: /\.css$/, use: [MiniCssExtractPlugin.loader,'css-loader'] },
          { test: /\.(png|jpe?g|svg|gif|webp)$/i, use: { loader: 'file-loader' }},
          {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader'
            },
          },
        ],
      },
      output: {
        publicPath: '',
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
        //sourceMapFilename: '[name].map',
        chunkFilename: '[id].[chunkhash].js'
      },
      resolve: {
        extensions: ['.js', '.jsx']
      },
      devtool: 'source-map',
      plugins:[
        new MiniCssExtractPlugin({
          filename: '[name].css',
          chunkFilename: '[id].css',
      }),
      
    //     new CopyWebpackPlugin({
    //       patterns: [
    //           { from: './img', to: 'img' },
    //           { from: './Fonts', to: 'fonts'}
    //       ]
    //    }),
       new OptimizeCSSAssetsPlugin({}),
        new HtmlWebpackPlugin({
          template: 'index.html',
          inject: 'body'
        })
      ],
    mode: 'development',
}