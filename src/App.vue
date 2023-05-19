<template>
    <router-view :key="key"></router-view>
</template>

<script setup>

import {useRoute} from "vue-router";
import {computed} from "vue";
import {createWebSocket, onClose} from "@/utils/socketUtil/socket-plugin.js";

const route = useRoute();//获取路由信息
const store = useStore();//获取vuex实例

const key = computed(() => {
    return route.path + Math.random();
});

onMounted(() => {
    //修改连接状态
    store.commit('messageAbout/changeLinkFlag', false)

    if (localStorage.getItem("session_token")) {
        store.dispatch('messageAbout/iniWebSocket')
    }
})

onBeforeUnmount(() => {
    onClose()

})


</script>

<style scoped>

</style>
