// http://momentjs.cn/
import moment from 'moment'

//设置moment国际化语言
moment.locale('zh-cn')

export function timeToNow(time) {
    //相对时间大于一个月，显示详细时间
    if (moment().diff(moment(time), "days") > 7) {
        return moment(time).format("YYYY-MM-DD HH:mm")
    }
    return moment(time).fromNow()
}

export function timeFormat(time, format = "YYYY-MM-DD HH:mm:ss") {
    return moment(time).format(format)
}

