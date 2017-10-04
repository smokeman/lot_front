const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const VuxLoader = require('vux-loader')

let originalConfig = {
    entry: {
        main: './src/main'
    },
    output: {
        path: path.join(__dirname, '/dist'),
        // publicPath:path.join(__dirname,'/dist/'),
        publicPath: '/dist',
        filename: 'main.js'
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        css: ExtractTextPlugin.extract({
                            use: ['css-loader', 'less-loader'],
                            fallback: 'vue-style-loader'
                        }),
                        // less:xtractTextPlugin.extract({
                        //     use:'less-loader',
                        //     fallback:'vue-style-loader'
                        // })
                    }
                }
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                // use:[
                //     'style-loader',
                //     'css-loader'
                // ]
                use: ExtractTextPlugin.extract({
                    use: 'css-loader',
                    fallback: 'style-loader'
                })
            },
            // {
            //     test:/\.less$/,
            //     use:'less-loader'
            // },
            {
                test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
                loader: 'file-loader?limit=1024'
            }
        ]
    },
    devServer: {
        // historyApiFallback: true,
        // contentBase: "./",
        quiet: false, //控制台中不输出打包的信息
        noInfo: false,
        // hot: true, //开启热点
        // inline: true, //开启页面自动刷新
        // lazy: false, //不启动懒加载
        progress: true, //显示打包的进度
        watchOptions: {
            aggregateTimeout: 300
        },
        port: '3333', //设置端口号
        //其实很简单的，只要配置这个参数就可以了
        // proxy: {
        //     '/lottery_add': {
        //         target: 'http://localhost:4000/',
        //         changeOrigin: true,
        //         secure: false
        //     }
        // }
    },
    plugins: [
        new ExtractTextPlugin('main.css')
    ],
    resolve: {
        extensions: ['.js', '.vue'],
        alias: {
            'vue$': 'vue/dist/vue.common.js'
        }
    }
    // resolveLoader:{
    //     moduleExtensions:["-loader"]
    // }
}

const webpackConfig = originalConfig
module.exports = VuxLoader.merge(webpackConfig, {
  plugins: ['vux-ui']
})
// module.exports = vuxLoader.merge(config, {
//   plugins: [
//     'vux-ui', 'progress-bar', 'duplicate-style',
//     {
//       name: 'less-theme',
//       path: 'src/style/theme.less'
//     }
//   ]
// })
