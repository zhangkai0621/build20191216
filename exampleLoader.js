module: {
    rules: [
        {
            // 命中 js 文件
            test: /\.js$/,
            // 使用 babel-loader 转换 javascript 文件
            // ?cacheDirectory 表示传给 babel-loader 的参数，用于缓存 babel 的编译结果，加快重新编译的速度
            use: ['babel-loader?cacheDirectory'],
            // 只命中 src 目录里的 JavaScript 文件，加快 webpack 的搜索速度
            include: path.resolve(__dirname, 'src')
        },
        {
            // 命中 scss 文件
            test: /\.scss$/,
            // 使用一组 loader 去处理 scss文件
            // 处理顺序为从后往前，即先交给 sass-loader 处理，再将结果交给 css-loader，最后交给 style-loader
            use: ['style-loader', 'css-loader', 'sass-loader'],
            // 排除 node_modules 目录下的文件
            exclude: path.resolve(__dirname, 'node_modules')
        },
        {
            // 对非文本文件采用 file-loader 加载
            test: /\.(gif | png | jpe?g | eot | woff | ttf | svg | pdf)$/,
            use: ['file-loader']
        }
    ]
}
 
// 在 Loader 需要传入很多参数时，可以通过一个 Object 来描述，例如上面的 babel-loader 配置
use: [
    {
        loader: 'babel-loader',
        options: {
            cacheDirectory: true,
        },
        // enforce: 'post'，表示该loader的执行顺序放在最后
        // enforce: 'pre'，表示该loader的执行顺序放在最前面
        enforce: 'post'
    }
]

// 上面的例子中 test、include、exclude 三个命令只传入一个字符串或者正则，其实也支持数组类型
// 数组中的每项是“或”的关系，只要满足数组中的一项就会被命中
{
    test: [
        /\.jsx$/,
        /\.tsx$/
    ],
    include: [
        path.resolve(__dirname, 'src'),
        path.resolve(__dirname, 'tests'),
    ],
    exclude: [
        path.resolve(__dirname, 'node_modules'),
        path.resolve(__dirname, 'bower_modules'),
    ]
}