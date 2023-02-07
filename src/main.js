import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

//引入store
import store from './store'
//引入socketIO
// import VueSocketIO from 'vue-socket.io'

import router from './router/index'

import './styles/index.scss'
//element3引入
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

//tdesign引入
//import {Comment} from 'tdesign-vue-next';
//import 'tdesign-vue-next/es/style/index.css';

// 该段代码不需要记，理解即可
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch((err) => err);
};

createApp(App)
    .use(router)
    .use(ElementPlus)
    .use(store)
    /*.use(new VueSocketIO({
        debug: true,// 生产环境关闭，打开可在控制台查看socket连接和事件监听的信息
        options: {
            autoConnect: false //创建时是否自动连接，默认关闭，使用时用open开启链接
        },
        connection: 'http://127.0.0.1:9527' //链接地址
    }))*/
    .mount('#app')
