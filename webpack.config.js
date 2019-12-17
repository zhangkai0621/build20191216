const path = require('path');
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
                use: ['style-loader', 'css-loader'],
            }
        ]
    }
}