import {createStore} from 'vuex';
import createPersistedState from "vuex-persistedstate";

import person from "@/store/user/person";
import count from "@/store/user/count";
import index from "@/store/index/index.js";
import message from "@/store/msg/message.js";
import user from "@/store/user/user.js";
import sendMsg from "@/store/msg/sendMsg.js";

//创建store实例
export default createStore({
    state: {}, //相当于一个存储空间
    getters: {},    //state的计算数据 实现数据过滤的作用（get）
    mutations: {},  //设置state中的数据（set）
    actions: {},    //可以发送异步请求
    modules: {
        personAbout: person,
        countAbout: count,
        indexAbout: index,
        messageAbout: message,
        userAbout:user,
        sendMsgAbout: sendMsg,
    },  //拆分存储空间模块化
    plugins: [
        //默认是存储在localStorage中
        createPersistedState({
            // key: 存储数据的键名
            key: 'longStore',
            //paths:存储state中的那些数据
            storage: window.localStorage
        })
    ],  //拓展vuex功能
})

