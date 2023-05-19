import {createApp} from 'vue'
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
//引入vue-core-video-player
// import vue3videoPlay from 'vue3-video-play' // 引入组件
// import 'vue3-video-play/dist/style.css' // 引入css

let app = createApp(App);

app.use(router)
    // .use(ElementPlus)
    .use(store)
    .mount('#app')
