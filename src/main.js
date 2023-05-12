import { createApp } from 'vue'
import '@/style.css'
import App from '@/App.vue'

//引入store
import store from '@/store'
//引入socketIO
// import VueSocketIO from 'vue-socket.io'

import router from '@/router/index'

import '@/styles/index.scss'
//element3引入
// import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

//tdesign引入
//import {Comment} from 'tdesign-vue-next';
import 'tdesign-vue-next/es/style/index.css';

let app = createApp(App);

app.use(router)
    // .use(ElementPlus)
    .use(store)
    .mount('#app')
