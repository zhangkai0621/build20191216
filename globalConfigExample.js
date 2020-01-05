// webpack 全局配置示例
const path = require('path');
module.exports = {
    // entry 表示入口，webpack执行构建的第一步将从 Entry 开始
    // 类型可以是 string、object、array
    entry: './app/entry', // 只有一个入口，入口只有一个文件
    entry: ['./app/entry1', './app/entry2'], // 只有一个入口，入口有两个文件
    entry: { // 有两个入口
        a: './app/entry-a',
        b: ['./app/entry-b1', './app/entry/entry-b1']
    },

    // 输出结果
    output: {
        // 输出文件存放的目录，必须是 string 类型的绝对路径
        path: path.resolve(__dirname, 'dist'),

        // 输出文件的名称
        filename: 'bundle.js', // 完整的名称
        filename: '[name].js', // 在配置了多个 entry 时，通过名称模板为不同的 entry 生成不同的文件名称
        filename: '[chunkhash].js', // 根据文件内容的 Hash 值生成文件的名称，用于浏览器长时间缓存文件

        // 发布到线上的所有资源的 URL 前缀，为 string 类型
        publicPath: '/assets/', // 放在指定目录下
        publicPath: '', // 放在根目录下
        publicPath: 'https://cdn.example.com/', // 放到 CDN 上

        // 导出库的名称，为 string 类型
        // 不填写时，默认的输出格式是匿名的立即执行函数
        library: 'MyLibrary',
        // 导出库的类型，为枚举类型，默认是 var
        // 可以是 umd、umd2、comminjs2、commonjs、amd、this、var、assign、window、global、jsonp
        libraryTarget: 'umd',

        // 是否包含有用的文件路径信息到生成的代码里，boolean
        pathinfo: true,
        
        // 附加 Chunk 的文件名称
        chunkFilename: '[id].js',
        chunkFilename: '[chunkhash].js',

        // jsonp 异步加载资源时的回调函数名称。需要和服务端搭配使用
        jsonpFunction: 'myWebpackJsonp',
        // 生成的 Source Map 文件的名称
        sourceMapFilename: '[file].map',
        // 浏览器开发者工具里显示源码模块的名称
        devtoolModuleFilenameTemplate: 'webpack:///[resource-path]',

        // 异步加载跨域资源时使用的方式
        crossOriginLoading: 'use-credentials',
        crossOriginLoading: 'anonymous',
        crossOriginLoading: false,
    }

}