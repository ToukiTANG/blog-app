import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter)

const router = new VueRouter({
    routes: [
        {
            path: '/',
            component: () => import('@/views/Index.vue'),
            redirect: '/home',
            children: [{
                path: '/home',
                name:'home',
                component: () => import('@/views/home/Home.vue'),
            }]
        }
    ],
})

export default router