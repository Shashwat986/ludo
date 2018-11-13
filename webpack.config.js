const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const path = require('path');

const PROD = (process.env.NODE_ENV === 'production');

module.exports = {
  entry: './src/app.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.common.js'
    }
  },
  plugins: [
    new CopyWebpackPlugin([
      {
        from: './index.html',
        to: 'index.html'
      }
    ])
  ].concat(
    PROD ? [
      new UglifyJSPlugin(),
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: '"production"'
        }
      })
    ] : []
  ),
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          js: 'babel?presets[]=es2015'
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015']
        }
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.scss$/,
        use: [
          "style-loader", // creates style nodes from JS strings
          "css-loader", // translates CSS into CommonJS
          "sass-loader" // compiles Sass to CSS, using Node Sass by default
        ]
      },
      {
        test: /\.(jpe?g|gif|png|svg|woff2?|eot|ttf|wav|mp3)(\?.*$|$)/,
        loader: 'file-loader'
      }
    ]
  }
};
