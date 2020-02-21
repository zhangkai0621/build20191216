const path = require('path');
// 引入 Plugin
const ExtractTextPlugin = require('extract-text-webpack-plugin');
module.exports = {
    // 执行入口
    entry: './main.js',
    output: {
        // 将所有依赖的模块合并输出到一个 bundle.js 的文件
        filename: 'bundle.js',
        // 将输出文件都放到 dist 目录下
        path: path.resolve(__dirname, './dist')
    },
    /* 
        非 javascript 文件使用 webpack 的 Loader 机制 
        Loader 可以看作具有文件转换功能的翻译员
    */ 
    module: {
        // rules 数组配置哪些文件使用哪些 Loader 去加载和转换
        rules: [ 
            {
                // 使用正则表达式去匹配要用该 Loader 转换的 CSS文件
                test: /\.css$/,
                /* 
                    Loader 的执行顺序是有后至前
                    当遇到 .css 结尾的文件时，先由 css-loader 读取文件，再由 style-loader 将 css 的内容注入 javascript
                */
                // use: ['style-loader', 'css-loader'],

                loaders: ExtractTextPlugin.extract({
                    // 转换 .css 文件需要使用的 Loader
                    use: ['css-loader'],
                })
            },
            // 接入Babel
            {
                test: /\.js$/,
                use: ['babel-loader']
            }
        ]
    },
    devtool: 'source-map',
    plugins: [
        new ExtractTextPlugin({
            // 从 .js 文件中提取出来的 .css 文件的名称
            // 因为 webpack 4.3 包含了 contenthash 这个关键字段，所以在 ExtractTextPlugin 中不能使用 contenthash
            // 使用 md5:contenthash:hex:8 替代
            filename: `[name]_[md5:contenthash:hex:8].css`,
        })
    ]
}
