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
import {library} from "@fortawesome/fontawesome-svg-core";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import {faCircleUp, faCalendarDays, faEye, faFolderOpen, faA, faBook} from "@fortawesome/free-solid-svg-icons"

import router from './router'
import store from '@/store/index'

import "@/utils/timeFormat.js"

library.add(faCircleUp, faCalendarDays, faEye, faFolderOpen, faA, faBook)
Vue.component('font-awesome-icon', FontAwesomeIcon)

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
