import 'babel-polyfill';
export default {
  entry: './src/javascripts/entry.js',
  output: {
    path: './dest/javascripts',
    filename: 'bundle.js'
  },
  target: 'web',
  module: {
    loaders: [
      { exclude: "node_modules", loader: "babel-loader" }
    ],
  },
};
