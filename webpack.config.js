const path = require('path')

module.exports = {
  mode: 'development',
  entry: './src/index.tsx',
  module: {
      rules: [
          {
              enforce: 'pre',
              test: /\.tsx?$/,
              loader: 'ts-loader',
              exclude: /node_modules/
          }
      ]
  },
  resolve: {
      alias: {
          'components': path.resolve(__dirname, 'src/components')
      },
      extensions: [ '.ts', '.tsx', '.js', '.json' ]
  },
  devServer: {
      historyApiFallback: true
  },
  output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist')
  }
}
