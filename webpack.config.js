const path = require('path');

const config = {
    entry: ['babel-polyfill', './src/index.js'],
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {test: /\.js$/, exclude: /node_modules/, use:{loader: 'babel-loader'}}
        ]
    },
    devServer:{
        contentBase: './public',
    }
};

module.exports = config;