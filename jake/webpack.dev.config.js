const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { ModuleFederationPlugin } = require('webpack').container;

module.exports = {
    entry: {
        'jake': './src/jakePage.js'
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, './dist'),
        publicPath: '/',
        clean: true
    },
    mode: 'development',
    devServer: {
        port: 9002,
        static: {
            directory: path.resolve(__dirname, './dist'),
        },
        devMiddleware: {
            index: 'jakePage.html',
            writeToDisk: true
        }
    },
    module: {
        rules: [
            {
                test: /\.(png|jpg)$/,
                type: 'asset',
                parser: {
                    dataUrlCondition: {
                        maxSize: 3 * 1024
                    }
                }
            },
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
            filename: 'jakePage.html',
            // chunks: ['jake'],
            title: 'Jake Page',
            description: 'Picture of Awesome Jake and Dad in Dallas',
            minify: false
        }),
        new ModuleFederationPlugin({
            name: 'JakeApp',
            filename: 'remoteEntry.js',
            remotes: {
                HelloWorldApp: 'HelloWorldApp@http://localhost:9001/remoteEntry.js'
            }
        })
    ]
}