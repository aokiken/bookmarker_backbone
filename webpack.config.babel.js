import 'babel-polyfill';
export default {
  entry: './src/test',
  output: {
    path: './dest/javascripts',
    filename: '[name].js'
  },
  target: 'web',
  module: {
    loaders: [
      { exclude: "node_modules", loader: "babel-loader" }
    ],
  },
};
