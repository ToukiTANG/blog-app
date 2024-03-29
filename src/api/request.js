import axios from "axios";
import NProgress from "nprogress";
import "nprogress/nprogress.css"

const requests = axios.create({
    //基础路径，发请求的时候会在路径中出现api
    baseURL: "/api",
    //网络超时5s
    timeout: 5000
})
//请求拦截器
requests.interceptors.request.use((config) => {
    //nprogress进度条
    NProgress.start()
    //config中可以配置请求头Header
    const identification = window.localStorage.getItem('identification')
    //identification存在，且是基于baseURL的请求
    if (identification && !(config.url.startsWith('http://') || config.url.startsWith('https://'))) {
        config.headers.identification = identification
    }
    return config
}, error => {
    NProgress.done()
    return Promise.reject(error)
})
//响应拦截器
requests.interceptors.response.use((res) => {
    NProgress.done()
    //成功的回调
    if (res.status !== 200) {
        return Promise.reject("error")
    } else {
        const identification = res.headers.identification
        if (identification) {
            //保存身份标识到localStorage
            window.localStorage.setItem('identification', identification)
        }

        return res.data
    }
}, () => {
    //失败的回调
    NProgress.done()
    return Promise.reject("error")
})
export default requests
