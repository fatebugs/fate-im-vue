<template>
  <div>
    <t-list :split="true" class="msgList" style="max-height: 70vh;">
      <!--          用户加入的群聊-->
      <t-button v-for="(item,index) in groupList"
                :key="index"
                :active="item.id === store.state.messageAbout.checkGroupId"
                block
                style="height: 90px;"
                @click="checkGroup(item.groupId)"
      >
        <t-list-item style="width: 18vw;">
          <t-list-item-meta
              :image="item.groupAvatar" :title="item.groupName">
            <template #description>
              <p>【公告】：{{ item.announcement ? item.announcement : '暂无公告' }}</p>
            </template>
          </t-list-item-meta>
        </t-list-item>
      </t-button>

    </t-list>
  </div>
</template>
<script setup>
import store from "@/store/index.js";

let groupList = computed(() => {
  let groupList1 = store.state.messageAbout.groupList;
  //按id排序
  groupList1.sort((a, b) => {
    return a.groupId - b.groupId
  })

  return groupList1
})


//切换群组
const checkGroup = (id) => {
  store.dispatch('messageAbout/checkGroup', id)
  // store.dispatch('messageAbout/getUserChatMsg', id)
}
</script>

<style scoped>

</style>
