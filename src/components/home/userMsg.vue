<template>
  <t-aside class="userChatList" style="width:20vw;border-top: 1px solid var(--component-border);">
    <contact-list v-show="chatList"></contact-list>
    <span v-show="!chatList">暂时没有消息哦</span>
  </t-aside>
  <t-layout>
    <t-content style="width: 50vw;border-top: 1px solid var(--component-border);">
      <div v-if="messageList.length!==0" style="width: 50vw;height: 70vh;background-color: #FFF1C3">
        <t-list :split="true" class="msgList" style="max-height: 70vh;"
                @scroll="scrollHandler">
          <t-list-item v-for="(msg, index) in messageList" :key="index">
            <template #content>
              <t-comment :author="msg.nickName"
                         :avatar="msg.avatar"
                         :content="msg.content"
                         :datetime="msg.msgTime">
                <template #actions>
                  <t-space key="chat" :size="6">
                    <t-icon name="chat"/>
                    <span>回复</span>
                  </t-space>
                  <t-space key="thumbUp" :size="6">
                    <t-icon name="delete"/>
                    <span>删除</span>
                  </t-space>
                </template>
              </t-comment>
            </template>

          </t-list-item>

        </t-list>

        <t-back-top
            :visible-height="50"
            container=".msgList"
            style="position: absolute; right: 22%; bottom: 24%"
        ></t-back-top>

      </div>
      <div v-if="messageList.length!==0" style="">
        <t-row justify="center" style="height: 5vh;margin-top: 1vh">
          <t-col :span="2">
            <t-popup content="图片发送" destroy-on-close>
              <t-button shape="square"
                        variant="text"
                        @click="store.commit('sendMsgAbout/setFormVisible',true)"
              >
                <template #icon>
                  <t-icon name="image" size="2em"/>
                </template>
              </t-button>
            </t-popup>
          </t-col>
          <t-col :span="2">
            <t-popup content="视频发送" destroy-on-close>
              <t-button shape="square" variant="text">
                <template #icon>
                  <t-icon name="play-circle-filled" size="2em"/>
                </template>
              </t-button>
            </t-popup>
          </t-col>
          <t-col :span="2">
            <t-popup content="文件发送" destroy-on-close>
              <t-button shape="square" variant="text">
                <template #icon>
                  <t-icon name="wallet" size="2em"/>
                </template>
              </t-button>
            </t-popup>
          </t-col>
          <t-col :span="2">
            <t-popup content="开启语音聊天" destroy-on-close>
              <t-button shape="square" variant="text">
                <template #icon>
                  <t-icon name="service" size="2em"/>
                </template>
              </t-button>
            </t-popup>
          </t-col>
          <t-col :span="2">
            <t-popup content="退出聊天" destroy-on-close>
              <t-button shape="square" variant="text">
                <template #icon>
                  <t-icon name="poweroff" size="2em"/>
                </template>
              </t-button>
            </t-popup>
          </t-col>
        </t-row>
        <t-comment :avatar="userInfo.userInfoAvatar">
          <template #content>
            <div class="form-container">
              <t-textarea v-model="replyData" placeholder="请输入内容"/>
              <t-button class="form-submit" @click="submitReply">回复</t-button>
            </div>
          </template>
        </t-comment>
      </div>
    </t-content>
  </t-layout>

  <ImageForm :data="1"></ImageForm>

</template>
<script setup>
import ContactList from "@/components/home/contactList.vue";
import {MessagePlugin} from 'tdesign-vue-next';


let messageList = computed(() => {
  let userChatMsg = store.state.messageAbout.userChatMsg;
  userChatMsg.sort((a, b) => {
    return b.id - a.id
  })
  return userChatMsg
})
let userInfo = computed(() => {
  return store.state.userAbout.tokenInfo.user
})

let chatList = computed(() => {
  return useStore().state.messageAbout.userMsgList
})


let replyData = ref('')
//监听列表滚动事件
const scrollHandler = (e) => {
  console.log(e)
};

const submitReply = () => {
  if (replyData.value === '') {
    MessagePlugin.error('不能发送空消息哦')
    return
  }
  store.dispatch('messageAbout/sendMessage', replyData.value)
  replyData.value = ''
}

onMounted(() => {
  store.dispatch('messageAbout/iniWebSocket')
  // store.commit('sendMsgAbout/setFormVisible', false)
})


import "vue3-video-play/dist/style.css";
import vue3VideoPlay from "vue3-video-play";
import store from "@/store/index.js";
import ImageForm from "@/components/home/dialogForm/imageForm.vue";


let data = reactive({
  options: {
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
  poster: ""
});
</script>

<style scoped>

</style>
