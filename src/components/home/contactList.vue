<template>

    <t-list :split="true" style="max-height: 92vh;" @scroll="scrollHandler">
        <t-button v-for="(chat,index) of chatList" :key="index" block style="height: 90px;"
                  theme="default" variant="outline"
        @click="checkUserChat(chat)"
        >
            <t-list-item style="width: 18vw;">
                <t-list-item-meta :image="chat.friendAvatar" :title="chat.friendName">
                    <template #description>
                        <p>{{chat.id}}{{ chat.lastMessage }}</p>
                    </template>

                </t-list-item-meta>
                <template #action>
                    <span>{{ dayjs(chat.lastMessageTime).format('hh:mm')}}</span>
                </template>
            </t-list-item>
        </t-button>
    </t-list>

</template>

<script setup>
import dayjs from "dayjs";

let chatList = computed(() => {
    return useStore().state.messageAbout.userMsgList
})

//映射vuex的方法
const store = useStore();
const checkUserChat = (chat) => {
    store.dispatch('messageAbout/checkUserChat',chat)
}




//监听列表滚动事件
const scrollHandler = (e) => console.log(e);

</script>

<style scoped>

</style>
