import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from './router'
import store from '@/store/index'

import "@/utils/timeFormat.js"

Vue.config.productionTip = false
Vue.use(ElementUI)


new Vue({
    render: h => h(App),
    store,
    router: router
}).$mount('#app')
