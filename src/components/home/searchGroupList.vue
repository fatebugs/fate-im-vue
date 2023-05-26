<template>
  <div style="max-height: 92vh;">

    <t-list :split="true" style="max-height: 92vh;" @scroll="scrollHandler">
      <t-list-item v-for="(group,index) in searchGroupListData"
                   :key="index"
                   style="width: 18vw;">
        <t-list-item-meta :image="group.groupAvatar"
                          :title="group.groupName">
          <template #description>
            <p>【公告】：{{ group.announcement ? group.announcement : '暂无公告' }}</p>
          </template>

        </t-list-item-meta>
        <template #action>
          <t-link hover="color" style="margin-left: 16px" theme="primary"
                  @click="lunchGroupApplyForm(group.groupId)">
            加入群聊
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
import {joinGroup} from "@/api/home/home.js";
import {MessagePlugin} from 'tdesign-vue-next';


let props = defineProps(['searchGroupListData']);
const searchGroupListData = toRefs(props).searchGroupListData

let friendId = ref('')

const lunchGroupApplyForm = (id) => {
  console.log(id)
  let params = {
    groupId: id,
  }
  joinGroup(params).then(res => {
    console.log(res.data)
    if (res.data.code === 200) {
      MessagePlugin.success('加入成功')
    }
  })
}

//监听列表滚动事件
const scrollHandler = (e) => console.log(e);

</script>

<style scoped>

</style>
