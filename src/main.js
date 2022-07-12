import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from './router'
import store from '@/store/index'
import {timeToNow, timeFormat} from "@/utils/timeFormat";

Vue.config.productionTip = false
Vue.use(ElementUI)

Vue.filter("timeToNow", function (time) {
    return timeToNow(time)
})

Vue.filter("timeFormat", function (time, format = "YYYY-MM-DD HH:mm:ss") {
    return timeFormat(time, format)
})

new Vue({
    render: h => h(App),
    store,
    router: router
}).$mount('#app')
