<template>
  <t-aside class="userChatList" style="width:20vw;border-top: 1px solid var(--component-border);">
    <contact-list v-show="chatList"></contact-list>
    <span v-show="!chatList">暂时没有消息哦</span>
  </t-aside>
  <t-layout>
    <t-content style="width: 50vw;border-top: 1px solid var(--component-border);">
      <div v-if="store.state.messageAbout.checkSessionId"
           style="width: 50vw;height: 70vh;background-color: #eeeeee"
      >
        <t-list :split="true" class="msgList" style="max-height: 70vh;"
                @scroll="scrollHandler">
          <t-list-item v-for="(msg, index) in messageList" :key="index">
            <template #content>
              <t-comment v-if="msg.contentType === 'text'"
                         :author="msg.nickName"
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

              <t-comment v-if="msg.contentType === 'image'"
                         :author="msg.nickName"
                         :avatar="msg.avatar"
                         :datetime="msg.msgTime">
                <template #content>
                  <t-image v-for="(image, index) in msg.content.split(',')"
                           :key="index"
                           :src="image"
                           :style="{ width: '15%', height: '15%' }"
                           class="tdesign-demo-image-viewer__ui-image--img"
                           fit="cover"
                           shape="square"
                  />
                </template>
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

              <t-comment v-if="msg.contentType === 'video'"
                         :author="msg.nickName"
                         :avatar="msg.avatar"
                         :datetime="msg.msgTime">
                <template #content>
                  <vue3-video-play v-for="(videoUrl,index) in msg.content.split(';')"
                                   :key="index"
                                   :poster="videoUrl+'?x-oss-process=video/snapshot,t_1000,f_jpg,w_500,h_281,m_fast'"
                                   :src="videoUrl"
                                   height="281px"
                                   v-bind="data"
                                   width="500px"
                  />
                </template>
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

              <t-comment v-if="msg.contentType === 'file'"
                         :author="msg.nickName"
                         :avatar="msg.avatar"
                         :datetime="msg.msgTime">
                <template #content>
                  <t-link v-for="(fileUrl,index) in msg.content.split(';')"
                          :href="fileUrl"
                          target="_blank"
                          hover="color"
                          theme="primary" underline>
                    <jump-icon slot="suffixIcon" />
                    文件{{index+1}}
                  </t-link>

                </template>
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
            :visible-height="0"
            container=".msgList"
            style="position: absolute; right: 22%; bottom: 24%"
        ></t-back-top>

      </div>
      <div v-if="store.state.messageAbout.checkSessionId" style="">
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
              <t-button shape="square"
                        variant="text"
                        @click="store.commit('sendMsgAbout/setVideoVisible',true)"
              >
                <template #icon>
                  <t-icon name="play-circle-filled" size="2em"/>
                </template>
              </t-button>
            </t-popup>
          </t-col>
          <t-col :span="2">
            <t-popup content="文件发送" destroy-on-close>
              <t-button shape="square"
                        variant="text"
                        @click="store.commit('sendMsgAbout/setFileVisible',true)"
              >
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
  <VideoForm :data="1"></VideoForm>
  <FileForm :data="1"></FileForm>

</template>
<script setup>
import ContactList from "@/components/home/contactList.vue";
import {MessagePlugin} from 'tdesign-vue-next';
import { LinkIcon, JumpIcon } from 'tdesign-icons-vue-next';


const visible = ref(false);

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
  let msg = {
    content: replyData.value,
    contentType: '0',
  }

  store.dispatch('messageAbout/sendMessage', msg)
  replyData.value = ''
}

onMounted(() => {
  store.dispatch('messageAbout/iniWebSocket')
  store.dispatch('messageAbout/getUserMsgList')
  // store.commit('sendMsgAbout/setFormVisible', false)
})


import "vue3-video-play/dist/style.css";
import vue3VideoPlay from "vue3-video-play";
import store from "@/store/index.js";
import ImageForm from "@/components/home/dialogForm/imageForm.vue";
import VideoForm from "@/components/home/dialogForm/videoForm.vue";
import FileForm from "@/components/home/dialogForm/fileForm.vue";


let data = reactive({
  options: {
    color: "#409eff", //主题色
    muted: false, //静音
    webFullScreen: false,
    speedRate: ["0.75", "1.0", "1.25", "1.5", "2.0"], //播放倍速
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
});
</script>

<style scoped>

</style>
