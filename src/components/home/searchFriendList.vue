<template>
  <div style="max-height: 92vh;">

    <t-list :split="true" style="max-height: 92vh;" @scroll="scrollHandler">
      <t-list-item v-for="(friend,index) in searchFriendListData"
                   :key="index"
                   style="width: 18vw;">
        <t-list-item-meta :title="friend.userInfoNickname"
                          :image="friend.userInfoAvatar">
          <template #description>
            <p>{{ friend.userInfoSignature }}</p>
          </template>

        </t-list-item-meta>
        <template #action>
          <t-link hover="color" style="margin-left: 16px" theme="primary"
                  @click="lunchFriendApplyForm(friend.userUuid)">
            添加好友
          </t-link>

        </template>
      </t-list-item>
    </t-list>
    <FriendApplyForm :friendId="friendId"></FriendApplyForm>
  </div>

</template>

<script setup>
import FriendApplyForm from "@/components/home/Form/friendApplyForm.vue";
import store from "@/store/index.js";

let props = defineProps(['searchFriendListData']);
const searchFriendListData = toRefs(props).searchFriendListData

let friendId = ref('')

const lunchFriendApplyForm = (id) => {
  friendId.value = id
  store.commit('sendMsgAbout/setUserApplyVisible', true)
}

//监听列表滚动事件
const scrollHandler = (e) => console.log(e);

</script>

<style scoped>

</style>
