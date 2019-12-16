const path = require('path');
module.exports = {
    // 执行入口
    entry: './main.js',
    output: {
        // 将所有依赖的模块合并输出到一个 bundle.js 的文件
        filename: 'bundle.js',
        // 将输出文件都放到 dist 目录下
        path: path.resolve(__dirname, './dist')
    }
}