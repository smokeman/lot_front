default 指没有固定名称
module.exports es5语法
export default es6语法

webpack:{
    "webpack-dev-server --host 172.11.11.1 --port 8888 --open --config webpack.config.js"
    "path：用来存放打包后文件的输出目录 "
    "publicPath：指定资源文件引用的目录"
    `use:[
        'style-loader',
        'css-loader'
    ]执行顺序从后往前，先执行css,当遇到css文件，先解析成style再用style－loader`
    `extract-text-webpack-plugin抽取css到css文件
    exclude:'/node_modules' 错误 应该是
    exclude:/node_modules/`
    `css-loader?minimize打包后css是压缩的`
}

vue:{
    `局部组件需要注册，全局组件不需要`
    router:{
        `routes不适routers\router`
        `/params/222|aaa只有数字的时候才有id,所以aaa无效`
    }
}

html cdn:{
    src="//cdn.bot.....cn..../.js"
    可以是http也可以是https
}