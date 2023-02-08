import {createRouter, createWebHistory} from 'vue-router'

const routes = [
    // ...
    {
        path: '/:pathMatch(.*)*',
        name: "NotFound",
        component: () => import("@/view/404.vue"),
        meta: {
            notfound: true
        }
    },
    {
        path: '/',
        name: 'Index',
        component: () => import('@/view/index.vue'),
        meta: {
            title: '随缘IM'
        }
    },
    {
        path: "/login",
        name: "Login",
        component: () => import('@/view/login.vue'),
        meta: {
            title: "登录",
            needLogin: true
        }
    },

]


const router = createRouter({
    history: createWebHistory(),
    routes,
});

// 全局守卫
router.beforeEach((to, from, next) => {
    if (to.meta.title) {
        window.document.title = to.meta.title
    }

    next()
});
export default router
