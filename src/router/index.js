import Vue from "vue";
import VueRouter from "vue-router";
import getPageTitle from "@/utils/get-page-title";

Vue.use(VueRouter)

const router = new VueRouter({
    mode: process.env.NODE_ENV === "production" ? "history" : "hash",
    routes: [
        {
            path: '/',
            component: () => import('@/views/Index.vue'),
            redirect: '/home',
            children: [
                {
                    path: '/home',
                    name: 'home',
                    component: () => import('@/views/home/Home'),
                    meta: {title: "首页"}
                },
                {
                    path: '/category/:name',
                    name: 'category',
                    component: () => import('@/views/category/Category'),
                    meta: {title: "分类"}
                },
                {
                    path: '/archives',
                    name: 'archives',
                    component: () => import('@/views/archives/Archives'),
                    meta: {title: "归档"},
                },
                {
                    path: 'archive/:yearMonth',
                    name: 'archive',
                    component: () => import('@/views/archives/Archives'),
                    meta: {title: "年月归档"}
                },
                {
                    path: '/about',
                    name: 'about',
                    component: () => import('@/views/about/About'),
                    meta: {title: "关于"}
                },
                {
                    path: '/blog/:id',
                    name: 'blog',
                    component: () => import('@/views/blog/Blog'),
                    meta: {title: "博客"}
                },
                {
                    path: '/tag/:name',
                    name: 'tag',
                    component: () => import('@/views/tag/Tag'),
                    meta: {title: "标签"}
                },
                {
                    path: '/moment',
                    name: 'moment',
                    component: () => import('@/views/moment/Moment'),
                    meta: {title: "动态"}
                }
            ]
        }
    ],
})

//路由守卫，用于修改网站标签的标题
router.beforeEach((to, from, next) => {
    document.title = getPageTitle(to.meta.title)
    next()
})

export default router