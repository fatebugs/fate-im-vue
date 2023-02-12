import {createStore} from 'vuex';
import person from "@/store/user/person";
import count from "@/store/user/count";
import index from "@/store/index/index.js";

//创建store实例
export default createStore({
    state: {

    }, //相当于一个存储空间
    getters: {}, //state的计算数据 实现数据过滤的作用（get）
    mutations: {},//设置state中的数据（set）
    actions: {},  //可以发送异步请求
    modules: {
        personAbout:person,
        countAbout:count,
        indexAbout:index
    },  //拆分存储空间模块化
    // plugins: {},  //拓展vuex功能
})

