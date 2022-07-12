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
    return config
}, error => {
    NProgress.done()
    return Promise.reject(error)
})
//响应拦截器
requests.interceptors.response.use((res) => {
    NProgress.done()
    // console.log(res)
    //成功的回调
    if (res.data.code !== 200) {
        return Promise.reject("error")
    } else {
        return res.data
    }
}, error => {
    //失败的回调
    NProgress.done()
    console.log(error)
    return Promise.reject("error")
})
export default requests