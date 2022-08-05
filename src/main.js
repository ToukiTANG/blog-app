import Vue from 'vue'
import App from './App.vue'
import {
    Card, Pagination, Backtop, Divider, Collapse, CollapseItem, Tag, Button, Tooltip, Autocomplete
} from 'element-ui'

import {library} from "@fortawesome/fontawesome-svg-core";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import {
    faCircleUp,
    faCalendarDays,
    faEye,
    faFolderOpen,
    faA,
    faBook,
    faHouseChimney,
    faLayerGroup,
    faCaretDown,
    faCalendar,
    faCircleInfo,
    faAnglesDown,
    faShuffle,
    faTags,
    faCommentDots,
    faList
} from "@fortawesome/free-solid-svg-icons"
import {faHeart} from "@fortawesome/free-regular-svg-icons"

import router from './router'
import store from '@/store/index'

import "./assets/typo.css"
import "./utils/directive"
import "@/utils/timeFormat.js"

library.add(faCircleUp, faCalendarDays, faEye, faFolderOpen, faA, faBook, faHouseChimney, faLayerGroup,
    faCaretDown, faCalendar, faCircleInfo, faAnglesDown, faShuffle, faTags, faCommentDots, faHeart, faList)
Vue.component('font-awesome-icon', FontAwesomeIcon)

//滚动至页面顶部，使用 Element-ui 回到顶部 组件中的算法
Vue.prototype.scroll2Top = function () {
    const cubic = value => Math.pow(value, 3);
    const easeInOutCubic = value => value < 0.5 ? cubic(value * 2) / 2 : 1 - cubic((1 - value) * 2) / 2;
    const el = document.documentElement
    const beginTime = Date.now()
    const beginValue = el.scrollTop
    const rAF = window.requestAnimationFrame || (func => setTimeout(func, 16))
    const frameFunc = () => {
        const progress = (Date.now() - beginTime) / 500;
        if (progress < 1) {
            el.scrollTop = beginValue * (1 - easeInOutCubic(progress))
            rAF(frameFunc)
        } else {
            el.scrollTop = 0
        }
    }
    rAF(frameFunc)
}

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
Vue.use(Autocomplete)


new Vue({
    render: h => h(App), store, router: router
}).$mount('#app')
