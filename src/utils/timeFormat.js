import Vue from 'vue'
// http://momentjs.cn/
import moment from 'moment'

//设置moment国际化语言
moment.locale('zh-cn')

Vue.filter('timeFormat', function (value, format = 'YYYY-MM-DD HH:mm:ss') {
    return moment(value).format(format)
})

Vue.filter('timeToNow', function (value) {
    //相对时间大于一个月，显示详细时间
    if (moment().diff(moment(value),"days") > 7) {
        return moment(value).format('yyyy-MM-DD HH:mm')
    }
    return moment(value).fromNow()
})
