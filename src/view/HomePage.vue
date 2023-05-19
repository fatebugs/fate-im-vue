<template>
    <t-space direction="vertical" style="width: 99vw;">
        <t-layout>
            <t-header>
                <index-header></index-header>
            </t-header>
            <t-layout>
                <t-aside style="border-top: 1px solid var(--component-border);">
                    <menu-right></menu-right>
                </t-aside>
                <t-aside class="userChatList" style="border-top: 1px solid var(--component-border);">
                    <contact-list></contact-list>
                </t-aside>
                <t-layout>
                    <t-content style="border-top: 1px solid var(--component-border);">
                        <div style="width: 50vw;height: 80vh;background-color: #FFF1C3">
                            <t-list v-if="messageList[0]" :split="true" style="max-height: 75vh;"
                                    @scroll="scrollHandler">
                                <t-list-item v-for="(msg, index) in messageList" :key="index">
                                    <template #content>
                                        <t-comment :author="msg.nickName"
                                                   :avatar="msg.avatar"
                                                   :content="msg.content"
                                                   :datetime="msg.msgTime">
                                            <template #actions>

                                                <!--                                                <t-space key="thumbUp" :size="6">
                                                                                                    <t-icon name="thumb-up" />
                                                                                                    <span>6</span>
                                                                                                </t-space>
                                                                                                <t-space key="chat" :size="6">
                                                                                                    <t-icon name="chat" />
                                                                                                    <span>回复</span>
                                                                                                </t-space>-->
                                            </template>
                                        </t-comment>
                                    </template>


                                </t-list-item>

                            </t-list>

                        </div>
                        <t-comment :avatar="userInfo.userInfoAvatar">
                            <template #content>
                                <div class="form-container">
                                    <t-textarea v-model="replyData" placeholder="请输入内容"/>
                                    <t-button class="form-submit" @click="submitReply">回复</t-button>
                                </div>
                            </template>
                        </t-comment>
                    </t-content>
                </t-layout>
                <t-aside style="width: 20vw">
                    右侧未知区域
                </t-aside>
            </t-layout>
        </t-layout>
    </t-space>
</template>

<script setup>
import IndexHeader from "@/components/index/indexHeader.vue";
import MenuRight from "@/components/home/menuRight.vue";
import ContactList from "@/components/home/contactList.vue";

let store = useStore();
let messageList = computed(() => {
    return store.state.messageAbout.userChatMsg
})
let userInfo = computed(() => {
    return store.state.userAbout.tokenInfo.user
})
let replyData = ref('')

const submitReply = () => {
    if (replyData.value === '') {
        return
    }
    store.dispatch('messageAbout/sendMessage', replyData.value)
    replyData.value = ''
}

onMounted(() => {
    //挂载时获取基础信息
    store.dispatch('messageAbout/iniWebSocket')
})

//监听列表滚动事件
const scrollHandler = (e) => console.log(e);

import "vue3-video-play/dist/style.css";
import  vue3VideoPlay from "vue3-video-play";




let data = reactive({
    options:{
        width: "800px", //播放器高度
        height: "450px", //播放器高度
        color: "#409eff", //主题色
        title: "", //视频名称
        src: "https://oss.cronos.top/anime/video/%E5%88%80%E5%89%91%E7%A5%9E%E5%9F%9F.mp4", //视频源
        muted: false, //静音
        webFullScreen: false,
        speedRate: ["0.75", "1.0", "1.25", "1.5", "2.0"], //播放倍速
        autoPlay: false, //自动播放
        loop: false, //循环播放
        mirror: false, //镜像画面
        ligthOff: true, //关灯模式
        volume: 0.3, //默认音量大小
        control: true, //是否显示控制
        controlBtns: [
            "audioTrack",
            "quality",
            "speedRate",
            "volume",
            "setting",
            "pip",
            "pageFullScreen",
            "fullScreen",
        ], //显示所有按钮,
    },
    poster:""
});
</script>

<style scoped>
:root {
    --component-border: 1px solid black;
}

.userChatList {
    background: linear-gradient(to bottom, #4286f4, #b0b0b0);
}


.t-layout__sider {
    width: auto;
}

.my-component {
    border: var(--component-border);
    /* other styles */
}
</style>
