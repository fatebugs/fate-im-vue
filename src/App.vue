<template>
    <router-view :key="key"></router-view>
</template>

<script setup>

import {useRoute} from "vue-router";
import {computed} from "vue";
import {createWebSocket, onClose} from "@/utils/socketUtil/socket-plugin.js";
import {useStore} from "vuex";

const route = useRoute();//获取路由信息
const store = useStore();//获取vuex实例

const key = computed(() => {
    return route.path + Math.random();
});

//创建全局websocket连接，判断是否已经存在连接，存在则不创建
function iniWebSocket() {
    //创建全局websocket连接，判断是否已经存在连接，存在则不创建
    createWebSocket((data) => {
            console.log(data)
            store.dispatch('messageAbout/messageCallback', data)
        }
    )
}


onMounted(() => {
    if (localStorage.getItem("session_token")) {
        iniWebSocket()
    }
})

onBeforeUnmount(() => {
    onClose()
})


</script>

<style scoped>

</style>
