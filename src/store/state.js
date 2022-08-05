export default {
    //可视窗口大小
    clientSize: {
        clientHeight: 0,
        clientWidth: 1080
    },
    //由其他页面到首页的标记
    isOtherToHome: false,
    //网站的一些信息，如标题后缀等
    siteInfo: "",
    //统一色彩
    colorObj: {
        0: 'blue',
        1: 'dark',
        2: 'green',
        3: 'orange',
        4: 'red',
    },
    //个人标志信息
    introduction:{
        avatar:"",
        nickname:""
    },
    //文章渲染标识
    isBlogRenderComplete:false,
    //专注模式（去掉introduction和randomBlog及tags）
    focusMode: false,
}