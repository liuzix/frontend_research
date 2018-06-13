const HtmlWebPackPlugin = require("html-webpack-plugin");

const htmlPlugin = new HtmlWebPackPlugin({
    template: "./src/index.html",
    filename: "./index.html",
});


module.exports = {
    devServer: {
        contentBase: './dist',
        proxy: {
            '/api': 'http://localhost:3000',
        },
    },
    entry: {
        poly: "babel-polyfill",
        index: "./src/index.js"
    },
    output: {
        filename: '[name].bundle.js',
        chunkFilename: '[name].bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "style-loader",
                    },
                    {
                        loader: "css-loader",
                        options: {
                            modules: true,
                            importLoaders: 1,
                            localIdentName: "[name]_[local]_[hash:base64]",
                            sourceMap: true,
                            minimize: true
                        }
                    }
                ],
            },
            {
                test: /\.css$/,
                include: /node_modules/,
                use: [
                    {
                        loader: "style-loader",
                    },
                    {
                        loader: "css-loader",
                    }
                ],
            }
        ]
    },

    plugins: [htmlPlugin]
};
