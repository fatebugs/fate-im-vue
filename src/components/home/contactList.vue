<template>
  <div style="max-height: 92vh;">

    <t-list :split="true" style="max-height: 92vh;" @scroll="scrollHandler">
      <t-input label="好友名称：" placeholder="搜索好友信息">
        <template #suffixIcon>
            <t-icon name="user" :style="{ cursor: 'pointer' }"/>
        </template>
      </t-input>
      <t-button v-for="(chat,index) in chatList" :key="index" block style="height: 90px;"
                :theme=" checkChatId== chat.id ? 'primary' : 'default'"
                @click="checkUserChat(chat)"

      >
        <t-list-item style="width: 18vw;">
          <t-list-item-meta :image="chat.friendAvatar" :title="chat.friendName">
            <template #description>
              <p>{{ chat.lastMessage }}</p>
            </template>

          </t-list-item-meta>
          <template #action>
            <span>{{ chat.lastMessageTime?dayjs(chat.lastMessageTime).format('HH:mm'):"" }}</span>
          </template>
        </t-list-item>
      </t-button>
    </t-list>
  </div>
</template>

<script setup>
import dayjs from "dayjs";

let checkChatId = computed(() => {
  return store.state.messageAbout.checkSessionId
})


let chatList = computed(() => {
  return useStore().state.messageAbout.userMsgList
})

//映射vuex的方法
const store = useStore();
const checkUserChat = (chat) => {
  store.dispatch('messageAbout/checkUserChat', chat)
}


//监听列表滚动事件
const scrollHandler = (e) => console.log(e);

</script>

<style scoped>

</style>
