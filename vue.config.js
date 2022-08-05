const {defineConfig} = require('@vue/cli-service')
const path = require('path')
module.exports = defineConfig({
        transpileDependencies: true,
        lintOnSave: false,
        configureWebpack: {
            resolve: {
                alias: {
                    '@': path.resolve(__dirname, 'src')
                }
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
        publicPath: process.env.NODE_ENV === 'production' ? './' : '/'
    }
)
