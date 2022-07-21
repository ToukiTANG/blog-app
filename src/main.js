import Vue from 'vue'
import App from './App.vue'
import {
    Card,
    Pagination,
    Backtop,
    Divider,
    Collapse,
    CollapseItem,
    Tag,
    Button,
    Tooltip
} from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'
import router from './router'
import store from '@/store/index'

import "@/utils/timeFormat.js"

Vue.config.productionTip = false

Vue.use(Card)
Vue.use(Pagination)
Vue.use(Backtop)
Vue.use(Divider)
Vue.use(Collapse)
Vue.use(CollapseItem)
Vue.use(Tag)
Vue.use(Button)
Vue.use(Tooltip)



new Vue({
    render: h => h(App),
    store,
    router: router
}).$mount('#app')
