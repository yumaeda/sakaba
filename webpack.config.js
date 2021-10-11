const path = require('path')

module.exports = {
    // mode: 'production',
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
        alias: {},
        extensions: [ '.ts', '.tsx', '.js', '.json' ]
    },
    devServer: {
        compress: true,
        historyApiFallback: true,
        hot: true,
        open: true,
        static: {
            directory: __dirname
        }
    },
    output: {
        filename: 'index.min.js',
        path: __dirname
    }
}
