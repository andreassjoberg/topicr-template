/// <binding ProjectOpened='Watch - Development' />
var Path = require('path');

require('babel-polyfill');
require('es6-promise').polyfill();

module.exports = [
    {
        target: 'web',
        context: Path.join(__dirname, 'Scripts'),
        entry: {
            client: ['babel-polyfill', './src/index']
        },
        output: {
            path: Path.join(__dirname, 'wwwroot/js'),
            filename: '[name].bundle.js'
        },
        module: {
            rules: [
                {
                    test: /\.css$/,
                    loader: 'style-loader!css-loader'
                },
                {
                    test: /\.jsx?$/,
                    exclude: /node_modules/,
                    loader: 'babel-loader'
                }
            ]
        },
        resolve: {
            extensions: ['.js', '.jsx']
        }
    }
];