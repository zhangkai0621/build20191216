// 一，webpack alias 配置
resolve: {
    alias: {
        components: './src/components'
    }
}

// 当通过 import Button from 'components/button' 导入时，实际上被 alias 等价替换成了 
// import Button from './src/components/button';

// alias 还支持通过 $ 符号老缩小范围到只命中以关键字结尾的导入语句
resolve: {
    alias: {
        'react$': '/path/to/react.min.js'
    }
}
// react$ 只会命中以 react 结尾的导入语句

// 二，在导入语句没带文件后缀时，webpack 会自动带上后缀去尝试访问文件是否存在
// resolve.extensions 默认配置列表为
extensions: ['.js', '.json']
// 当遇到 require('./data') 这样导入时，webpack 会先寻找 ./data.js ，不存在则寻找 ./data.json。还是不存在，则报错

// 优先使用目录下的 TypeScript 文件
extensions: ['.ts', '.js', '.json']


// 三，resolve.modules 配置 webpack 去哪些目录下寻找第三方模块，默认只会去 node_modules 目录下寻找。
// 假如那些被大量导入的模块都在 ./src/components 目录下，则 modules 配置如下
modules: ['./src/components', 'node_modules'] 
//后则可以简单地通过 import 'button' 引入

// 四，如果 resolve.enforceExtension 被配置为 true，则所有导入语句都必须带文件后缀

// 五，enforceModuleExtension 只对 node_modules 下的模块生效。
// 在 enforceExtension: true 时，因为第三方模块大部分导入不带后缀，所以配置 enforceModuleExtension : false 来兼容第三方模块