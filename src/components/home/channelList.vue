<template>
  <div style="max-height: 92vh;">

    <t-list :split="true" style="max-height: 92vh;" @scroll="scrollHandler">
      <t-button v-for="(chat,index) in channel" :key="index" block style="height: 90px;"
                :theme=" checkChannelId== chat.channelId ? 'primary' : 'default'"
                @click="checkChannelChat(chat.channelId)"

      >
        <t-list-item style="width: 18vw;">
          <t-list-item-meta :image="chat.channelAvatar" :title="chat.channelName">
            <template #description>
              <p>{{ chat.lastMsg }}</p>
            </template>

          </t-list-item-meta>
          <template #action>
            <span>{{ chat.lastMsgTime?dayjs(chat.lastMsgTime).format('HH:mm'):"" }}</span>
          </template>
        </t-list-item>
      </t-button>
    </t-list>
  </div>
</template>

<script setup>
import dayjs from "dayjs";

let channel = computed(() => {
  return useStore().state.messageAbout.channelList
})

let checkChannelId = computed(() => {
  return store.state.messageAbout.checkChannelId
})


let chatList = computed(() => {
  return useStore().state.messageAbout.userMsgList
})

//映射vuex的方法
const store = useStore();
const checkChannelChat = (chat) => {
  store.dispatch('messageAbout/checkChannelChat', chat)
}


//监听列表滚动事件
const scrollHandler = (e) => console.log(e);

</script>

<style scoped>

</style>
