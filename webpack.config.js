/*eslint-disable */

const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const css = new ExtractTextPlugin('style.css');
module.exports = (env) => {
  const isProduction = env === 'production';
  return {
    entry: ['babel-polyfill', './App/app.jsx'],
    output: {
      path: path.join(__dirname, 'public'),
      filename: 'bundle.js',
    },
    module: {
      rules: [{
        loader: 'babel-loader',
        test: /\.jsx?$/,
        exclude: /node_modules/,
      },
      {
        test: /\.s?css$/,
        use: css.extract({
          use: [
            {
              loader: 'css-loader',
              options: { sourceMap: true },
            },
            {
              loader: 'sass-loader',
              options: { sourceMap: true },
            },
          ],
        }),
      },
      ],
    },
    resolve: {
      extensions: ['.js', '.jsx'],
    },
    plugins: [css],
    devtool: isProduction ? 'source-map' : 'inline-source-map',
    devServer: {
      contentBase: path.join(__dirname, 'public'),
      historyApiFallback: true,
      proxy: {
        '/': {
          target: 'http://localhost:3000',
          bypass(req) {
            if (req.headers.accept.indexOf('html') !== -1) {
              console.log('Skipping proxy for browser request.');
              return '/index.html';
            }
          },
        },
      },
    },
  };
};