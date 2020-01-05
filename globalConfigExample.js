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
    },

    // 配置模块相关
    module: {
        rules: [ // 配置 Loader
            {
                test: /\.jsx?$/, // 正则匹配命中要使用 Loader 的文件
                include: [ // 只会命中此目录下的文件
                    path.resolve(__dirname, 'app')
                ],
                exclude: [ // 忽略此目录下的文件
                    path.resolve(__dirname, 'app/demo-files')
                ],
                use: [ // 使用哪些 Loader， 有先后次序，从后往前执行
                    'style-loader', // 直接使用 Loader 的名称
                    {
                        loader: 'css-loader',
                        options: { // 向 css-loader 传一些参数

                        }
                    }
                ]
            }
        ],
        noParse: [ // 不用解析和处理的模块
            /special-library\.js$/ // 使用正则匹配
        ]
    },
    // 配置插件
    plugins: [],
    // 配置寻找模块的规则
    resolve: {
        modules: [ // 寻找模块的根目录，array，默认以 node_modules 为根目录
            'node_modules',
            path.resolve(__dirname, 'app')
        ],
        extensions: ['.js', '.json', '.jsx', '.css'], // 模块的后缀名
        alias: { // 模块别名配置，用于映射模块
            // 将 'modules' 映射成 'new-modules'，同样 'modules/path/file' 映射成 'new-modules/path/file'
            'modules': 'new-modules', 
        },
        alias: [ // alias 还支持数组来更详细地进行配置
            {
                name: 'module', // 老模块
                alias: 'new-module', // 新模块
                // 是否只映射模块, true 则只有 'module' 会被映射，false 则 'module/inner/path' 也会被映射
                onlyModule: true
            }
        ],
        symlinks: true, // 是否跟随文件的软连接去搜寻模块的路径
        descriptionFiles: ['package.json'], // 模块的描述文件
        mainFields: ['main'], // 模块的描述文件里描述入口的文件的字段名
        enforceExtension: false, // 是否强制导入语句写明文件后缀
    },
    // 输出文件的性能检查配置
    performance: {
        hints: 'warning', // 有性能问题时输出警告
        hints: 'error', // 有性能问题时输出错误
        hints: false, // 关闭性能检查
        maxAssetSize: 200000, // 最大文件的大小（bytes）
        maxEntrypointSize: 400000, // 最大入口文件的大小（bytes）
        assetsFilter: function(assetFilename) {
            return assetFilename.endsWith('.css') || assetFilename.endsWith('.js');
        },
    },
    devtool: 'source-map', // 配置 source-map 类型
    context: __dirname, // webpack 使用的根目录，string 类型必须是绝对路径
    
    // 配置输出代码的运行环境
    target: 'web', // 浏览器， 默认
    target: 'webworker', // WebWorker
    target: 'node', // node.js，使用 'require' 语句加载 chunk 代码
    target: 'async-node', // node.js 异步加载 chunk 代码
    target: 'node-webkit', // nw.js
    target: 'electron-main', // electron 主线程
    target: 'electron-renderer', // electron 渲染线程
    
    externals: { // 使用来自 javaScript 运行环境提供的全局变量
        jquery: 'jQuery'
    },
    stats: { // 控制台输出日志控制
        assets: true,
        colors: true,
        errors: true,
        errorDetails: true,
        hash: true
    },
    devServer: { // DevServer 相关配置
        proxy: { // 反向代理
            '/api': 'http://localhost:3000'
        },
        contentBase: path.join(__dirname, 'public'), // 配置 DevServer HTTP 服务器的文件根目录
        compress: true, // 是否开启 Gzip 压缩
        historyApiFallback: true, //是否开发 HTML5 History 单页面网页
        hot: true, // 是否开启模块热替换模式
        https: false, // 是否开启 HTTPS 模式
    },
    profile: true, // 是否捕捉 webpack 构建的性能信息，用于分析是什么原因导致构建性能不佳
    cache: false, // 是否启用缓存来提升构建速度
    watch: true, // 是否开启监听模式
    watchOptions: { // 监听模式选项
        // 不监听的文件或文件夹，支持正则匹配，默认为空
        ignored: /node_modules/,
        // 监听发生变化后，等 300ms 再执行动作，截流，防止文件更新太快导致重新编译频率太高。默认为 300ms
        aggregateTimeout: 300,
        // 不停地询问系统指定的文件有没有发生变化，默认每秒询问 1000 次
        poll: 1000
    }
}