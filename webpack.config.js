var webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
module.exports = {
    entry: './src/main.ts',
    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: 'ts-loader'
            },
            {
                test: /\.(css|scss)$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.svg$/,
                use: ['url-loader', 'svg-fill-loader']
            }
        ]
    },
    plugins: [
        new CopyWebpackPlugin([
            'src/index.html',
            'src/images/favicon.ico']),
        new webpack.DefinePlugin({ 'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV) }),
        new webpack.HotModuleReplacementPlugin()
    ],
    resolve: {
        extensions: ['*', '.js', '.ts']
    },
    output: {
        path: __dirname + '/dist',
        publicPath: '/',
        filename: 'bundle.js'
    },
    devServer: {
        hot: true,
        contentBase: './dist',
        disableHostCheck: true,
        host: '0.0.0.0',
        port: 8080,
        watchContentBase: true,
        watchOptions: {
            ignored: /node_modules/,
            poll: true
        }
    }
};
