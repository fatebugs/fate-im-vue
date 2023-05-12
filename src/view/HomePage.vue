<template>
    <t-layout>
        <index-header></index-header>
        <t-layout>
            <t-aside style="border-top: 1px solid var(--component-border);">
                <menu-right></menu-right>
            </t-aside>
            <t-aside style="border-top: 1px solid var(--component-border);">
                <contact-list></contact-list>
            </t-aside>
            <t-layout>
                <t-content style="border-top: 1px solid var(--component-border);">
                    <div style="width: 68vw;height: 80vh;background-color: #FFF1C3">

                    </div>

                </t-content>
            </t-layout>
            <t-aside>
                <el-button type="primary" @click="conn">按钮</el-button><br>
                <el-button type="primary" @click="sendMsg">按钮</el-button><br>
                <el-button type="primary" @click="disconn">按钮</el-button><br>
                右侧未知区域
            </t-aside>
        </t-layout>
    </t-layout>
</template>

<script setup>
import IndexHeader from "@/components/index/indexHeader.vue";
import MenuRight from "@/components/home/menuRight.vue";
import ContactList from "@/components/home/contactList.vue";

let ws=null;

function conn() {
    let url = 'ws://localhost:13300/websocket/im-service/FateIM';
    ws = new WebSocket(url);

    ws.onopen = function (evt) {
        console.log("Connection open ...");
        ws.send("session_token"+localStorage.getItem("session_token"));
    };
}

function sendMsg() {
    ws.send("Hello WebSockets!");
}

function disconn() {
    ws.close();
}


</script>

<style scoped>

</style>
