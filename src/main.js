import Vue from 'vue'
import App from './App.vue'
import {
    Card,
    Pagination,
    Backtop,
    Timeline,
    TimelineItem,
    Divider,
    Collapse,
    CollapseItem,
    Tag,
    Button
} from 'element-ui'
import {library} from "@fortawesome/fontawesome-svg-core";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import {faCircleUp, faCalendarDays, faEye, faFolderOpen} from "@fortawesome/free-solid-svg-icons"

import router from './router'
import store from '@/store/index'

import "@/utils/timeFormat.js"

library.add(faCircleUp, faCalendarDays, faEye, faFolderOpen)
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false
Vue.use(Card)
Vue.use(Pagination)
Vue.use(Backtop)
Vue.use(Timeline)
Vue.use(TimelineItem)
Vue.use(Divider)
Vue.use(Collapse)
Vue.use(CollapseItem)
Vue.use(Tag)
Vue.use(Button)


new Vue({
    render: h => h(App),
    store,
    router: router
}).$mount('#app')
