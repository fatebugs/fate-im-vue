import {createRouter, createWebHashHistory, createWebHistory} from 'vue-router'
import login from "../view/login.vue";
import App from "../App.vue";
const routes = [
    // ...
    {
        path:"/login",
        name:"Login",
        component: login
    },
    {
        path:"/1",
        name:"App",
        component: App
    },
]

export default createRouter({
    history: createWebHistory(),
    routes,
})
