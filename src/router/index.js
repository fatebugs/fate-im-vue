import {createRouter, createWebHistory} from 'vue-router'

const routes = [
    // ...
    {
        path: '/:pathMatch(.*)*',
        name: "NotFound",
        component: () => import("@/view/404.vue"),
        meta: {
            notfound: true,
            title: '啊哦，404了呢'

        }
    },
    {
        path: '/',
        name: 'Index',
        component: () => import('@/view/index.vue'),
        meta: {
            title: '随缘IM',
            needLogin: false
        }
    },
    {
        path: "/home",
        name: "HomePage",
        component:()=> import("@/view/HomePage.vue"),
        meta: {
            title: '随缘IM',
            needLogin: true
        }
    },
    {
        path: "/login",
        name: "Login",
        component: () => import('@/view/login.vue'),
        meta: {
            title: "登录",
            needLogin: false
        }
    },
    {
        path: "/register",
        name: "Register",
        component: () => import('@/view/register.vue'),
        meta: {
            title: "注册",
            needLogin: false
        }
    }

]


const router = createRouter({
    history: createWebHistory(),
    routes,
});

// 全局守卫
router.beforeEach((to, from, next) => {
    //修改标题
    if (to.meta.title) {
        window.document.title = to.meta.title
    }
    //判断是否需要登录
    if (to.meta.needLogin) {
        if (localStorage.getItem("session_token")) {
            next()
            return
        } else {
            next({
                name: "Login"
            })
            return;
        }
    }
    //如果当前在登录页，判断是否已经登录，如果已经登录，跳转到首页
    if (to.name === "Login") {
        if (localStorage.getItem("session_token")) {
            next({
                name: "HomePage"
            })
            return
        }
    }

    next()
});
export default router
