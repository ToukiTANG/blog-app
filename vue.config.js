const {defineConfig} = require('@vue/cli-service')
const path = require('path')
// 导入compression-webpack-plugin
const CompressionWebpackPlugin = require('compression-webpack-plugin')
// 定义压缩文件类型
const productionGzipExtensions = ['js', 'css']

module.exports = defineConfig({
        transpileDependencies: true,

        // 是否启用eslint
        lintOnSave: false,
        //打包不生成map文件
        productionSourceMap: false,
        configureWebpack: {
            resolve: {
                alias: {
                    '@': path.resolve(__dirname, 'src')
                }
            },
            plugins: [
                new CompressionWebpackPlugin({
                    filename: '[path].gz[query]',
                    algorithm: 'gzip',
                    test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
                    threshold: 10240,
                    minRatio: 0.2
                })
            ],
            externals:{
                vue:"Vue",
                'element-ui':"ELEMENT",
                moment:"moment",
                'vue-router':"VueRouter",
                vuex:"Vuex",
                axios:"axios"
            }
        },
        devServer: {
            // port: 8080,
            proxy: {
                "/": {
                    ws: false,
                    target: 'http://127.0.0.1:8888',
                    changeOrigin: true,
                    pathRewrite: {
                        '^/api': ''
                    }
                }
            },
        },
    }
)
