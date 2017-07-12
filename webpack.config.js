//  //var path = require('path');

 
// import webpack from 'webpack';
// import path from 'path';

// export default {
//   debug: true,
//   devtool: 'inline-source-map',
//   noInfo: false,
//   entry: [
//     'eventsource-polyfill', // necessary for hot reloading with IE
//     'webpack-hot-middleware/client?reload=true', //note that it reloads the page if hot module reloading fails.
//     path.resolve(__dirname, 'src/index'),
//     './app.js', './scss/main.scss'
//   ],
   
//   target: 'web',
//   output: {
//     path: __dirname + '/dist', // Note: Physical files are only output by the production build task `npm run build`.
//     publicPath: '/',
//     filename: 'bundle.js'
//   },
//   devServer: {
//     contentBase: path.resolve(__dirname, 'src')
//   },
//   plugins: [
//     new webpack.HotModuleReplacementPlugin(),
//     new webpack.NoErrorsPlugin()
//   ],
//   module: {
//     loaders: [
//       {test: /\.js$/, include: path.join(__dirname, 'src'), loaders: ['babel']},
//       {test: /(\.css)$/, loaders: ['style', 'css']},
//       {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file'},
//       {test: /\.(woff|woff2)$/, loader: 'url?prefix=font/&limit=5000'},
//       {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/octet-stream'},
//       {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=image/svg+xml'}
//     ]
//   }
// };
import ExtractTextPlugin from 'extract-text-webpack-plugin';

module.exports = {
  entry: ['./app.js', './scss/main.scss'],
  output: {
    filename: 'dist/bundle.js'
  },
  module: {

    rules: [
      /*
       other rules for JavaScript transpiling go in here
      */
      { // regular css files
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          loader: 'css-loader?importLoaders=1',
        }),
      },
      { // sass / scss loader for webpack
        test: /\.(sass|scss)$/,
        loader: ExtractTextPlugin.extract(['css-loader', 'sass-loader'])
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin({ // define where to save the file
      filename: 'dist/[name].bundle.css',
      allChunks: true,
    }),
  ],
};