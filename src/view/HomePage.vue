<template>
    <t-layout>
        <index-header></index-header>
        <t-layout>
            <t-aside style="border-top: 1px solid var(--component-border);width: 20vw;margin-left: 15vw">
                <t-list :split="true" style="max-height: 90vh" @scroll="scrollHandler">
                    <t-list-item v-for="(message,index) of messageList" :key="index">
                        <t-list-item-meta :image="message.avatar" :title="message.userName">
                            <template #description>
                                <p>{{ message.lastMsg }}</p>
                            </template>

                        </t-list-item-meta>
                        <template #action>
                            <span>{{ message.time }}</span>
                        </template>
                    </t-list-item>
                </t-list>
            </t-aside>
            <t-layout>
                <t-content>
                    <t-aside style="border-top: 1px solid var(--component-border);width: 48vw;height: 80vh;background-color: #FFF1C3">

                    </t-aside>
                </t-content>
            </t-layout>
        </t-layout>
    </t-layout>
</template>

<script setup>
import IndexHeader from "@/components/index/indexHeader.vue";

let messageList = reactive(
    [
        {
            "id": '1',
            "userName": '随缘',
            "avatar": 'https://klns.oss-cn-beijing.aliyuncs.com/wgmrtp.png',
            "lastMsg": 'Hello Bug',
            "time": '17:07:27'
        },
        {
            "id": '1',
            "userName": '随缘',
            "avatar": 'https://klns.oss-cn-beijing.aliyuncs.com/wgmrtp.png',
            "lastMsg": 'Hello Bug',
            "time": '17:07:27'
        },
        {
            "id": '1',
            "userName": '随缘',
            "avatar": 'https://klns.oss-cn-beijing.aliyuncs.com/wgmrtp.png',
            "lastMsg": 'Hello Bug',
            "time": '17:07:27'
        },
        {
            "id": '1',
            "userName": '随缘',
            "avatar": 'https://klns.oss-cn-beijing.aliyuncs.com/wgmrtp.png',
            "lastMsg": 'Hello Bug',
            "time": '17:07:27'
        },
        {
            "id": '1',
            "userName": '随缘',
            "avatar": 'https://klns.oss-cn-beijing.aliyuncs.com/wgmrtp.png',
            "lastMsg": 'Hello Bug',
            "time": '17:07:27'
        },
        {
            "id": '1',
            "userName": '随缘',
            "avatar": 'https://klns.oss-cn-beijing.aliyuncs.com/wgmrtp.png',
            "lastMsg": 'Hello Bug',
            "time": '17:07:27'
        },
        {
            "id": '1',
            "userName": '随缘',
            "avatar": 'https://klns.oss-cn-beijing.aliyuncs.com/wgmrtp.png',
            "lastMsg": 'Hello Bug',
            "time": '17:07:27'
        },
        {
            "id": '1',
            "userName": '随缘',
            "avatar": 'https://klns.oss-cn-beijing.aliyuncs.com/wgmrtp.png',
            "lastMsg": 'Hello Bug',
            "time": '17:07:27'
        },
        {
            "id": '1',
            "userName": '随缘',
            "avatar": 'https://klns.oss-cn-beijing.aliyuncs.com/wgmrtp.png',
            "lastMsg": 'Hello Bug',
            "time": '17:07:27'
        },
        {
            "id": '1',
            "userName": '随缘',
            "avatar": 'https://klns.oss-cn-beijing.aliyuncs.com/wgmrtp.png',
            "lastMsg": 'Hello Bug',
            "time": '17:07:27'
        },
        {
            "id": '1',
            "userName": '随缘',
            "avatar": 'https://klns.oss-cn-beijing.aliyuncs.com/wgmrtp.png',
            "lastMsg": 'Hello Bug',
            "time": '17:07:27'
        },
        {
            "id": '1',
            "userName": '随缘',
            "avatar": 'https://klns.oss-cn-beijing.aliyuncs.com/wgmrtp.png',
            "lastMsg": 'Hello Bug',
            "time": '17:07:27'
        },
    ]
)


let imageUrl = ref("https://tdesign.gtimg.com/site/avatar.jpg")

//监听列表滚动事件
const scrollHandler = (e) => console.log(e);

</script>

<style scoped>

</style>
