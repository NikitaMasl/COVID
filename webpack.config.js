const path = require('path');

module.exports = {
    entry: './src/index.js',
    mode:'production',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    "presets": [
                        "@babel/preset-env",
                        "@babel/preset-react"
                    ],
                    "plugins": [
                        [
                          "@babel/plugin-proposal-class-properties"
                        ]
                    ]
                }  
            }
        ]
    }
}