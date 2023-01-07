const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { ModuleFederationPlugin } = require('webpack').container;

module.exports = {
    entry: {
        'hello-world': './src/helloWorld.js',
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, './dist'),
        publicPath: 'http://localhost:9001/',
        clean: true
    },
    mode: 'development',
    devServer: {
        port: 9001,
        static: {
            directory: path.resolve(__dirname, './dist'),
        },
        devMiddleware: {
            index: 'helloWorld.html',
            writeToDisk: true
        }
    },
    module: {
        rules: [
            {
                test: /\.txt$/,
                type: 'asset/source'
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']  
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [ '@babel/preset-env'],
                        plugins: []
                    }
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'helloWorld.html',
            // chunks: ['hello-world'],
            title: 'Webpack Class',
            description: 'Basics of Webpack usage.',
            minify: false
        }),
        new ModuleFederationPlugin({
            name: 'HelloWorldApp',
            filename: 'remoteEntry.js',
            exposes: {
                './HelloWorldButton': './src/components/helloWorldButton/helloWorldButton.js'
            }
        })
    ]
}