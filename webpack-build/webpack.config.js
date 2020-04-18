const path = require('path')

module.exports = {
  mode: process.env.NODE_ENV || 'development',
  entry: ['@babel/polyfill', path.resolve(__dirname, 'src', 'main.js')],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },
  resolve: {
    alias: {
      '~': path.resolve(__dirname, 'src'),
      'Components': path.resolve(__dirname, 'src', 'components'),
      'Objects': path.resolve(__dirname, 'src', 'objects'),
      'Models': path.resolve(__dirname, 'src', 'models'),
      'Shaders$': path.resolve(__dirname, 'src', 'shaders', 'main.js'),
      'Functions': path.resolve(__dirname, 'src', 'shaders', 'functions')
    }
  },
  node: {
    fs: 'empty'
  },
  devServer: {
    port: process.env.PORT || 8080, // it's possible to specific which port you'd prefer to use
    writeToDisk: true,
    contentBase: path.resolve(__dirname, 'dist'),
    hot: true
  }
}
