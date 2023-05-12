<template>

        <t-list :split="true" style="max-height: 92vh;width: 20vw" @scroll="scrollHandler">
            <t-button v-for="(message,index) of messageList" :key="index" block style="height: 90px;"
                      theme="default" variant="outline">
                <t-list-item style="width: 18vw">
                    <t-list-item-meta :image="message.avatar" :title="message.userName">
                        <template #description>
                            <p>{{ message.lastMsg }}</p>
                        </template>

                    </t-list-item-meta>
                    <template #action>
                        <span>{{ message.time }}</span>
                    </template>
                </t-list-item>
            </t-button>
        </t-list>

</template>

<script setup>
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
