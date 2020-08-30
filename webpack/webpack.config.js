var HtmlWebpackPlugin = require('html-webpack-plugin');
var MiniCssExtractPlugin = require('mini-css-extract-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: "production",
  entry: "./src/scripts/main.js",//path relative to this file
  output: {
    filename: "js/app.bundle.js"//path relative to this file
  },
  plugins: [
    new HtmlWebpackPlugin({
      hash: true,
      template: './src/index.html',
      filename: 'index.html' //relative to root of the application
    }),
    new CopyWebpackPlugin([
      {from:'src/images',to:'images'}
    ]),
    new MiniCssExtractPlugin({filename:'style.css'})
  ],
  module:{
    rules:[
      {
        test: /\.js$/, //Regular expression 
        exclude: /(node_modules|bower_components)/,//excluded node_modules 
        use: {
        loader: "babel-loader", 
        options: {
          presets: ["@babel/preset-env"]  //Preset used for env setup
         }
        }
       },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              // you can specify a publicPath here
              // by default it uses publicPath in webpackOptions.output
              publicPath: '',
              hmr: process.env.NODE_ENV === 'development',
            }
          },
          'css-loader',
          'sass-loader',
          'postcss-loader'
        ]
      },
      {
        test: /\.jpe?g$|\.gif$|\.png$|\.webp$/i,
        loader: "file-loader?name=images/[name].[ext]"
      },
      {
        test: /\.otf$/,
        loader: "file-loader?name=fonts/Brown/[name].[ext]"
      }
    ]
  }
}
