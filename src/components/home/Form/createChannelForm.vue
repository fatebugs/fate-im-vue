<template>
  <t-dialog :footer="false" :visible="formVisible" :width="680" header="创建群聊频道">
    <template #body>
      <t-form-item label="频道头像(非必传，生成默认头像)">
        <t-upload ref="avatar"
                  v-model="avatarFiles"
                  :action="uploadUrl"
                  :auto-upload="true"
                  :format-response="formatResponse"
                  :locale="{
                        triggerUploadText: {
                          image: '请选择图片',
                        },
                      }"
                  accept="image/*"
                  theme="image"
                  @fail="handleFail"
                  @success="handleSuccess"
        ></t-upload>
      </t-form-item>
      <t-form-item label="频道名称" name="name">
        <t-input
            v-model="channelParam.channelName"
            align="center"
            autofocus
            clearable
            placeholder="请输入频道名称"
        />
      </t-form-item>
      <t-form-item label="频道主题" name="topic">
        <t-input
            v-model="channelParam.channelTopic"
            align="center"
            autofocus
            clearable
            placeholder="请输入频道主题"
        />
      </t-form-item>
      <br>

      <t-button variant="outline" @click="onClickCloseBtn">取消</t-button>
      <t-button theme="primary" @click="send">创建</t-button>
    </template>
  </t-dialog>
</template>

<script setup>
import {MessagePlugin} from 'tdesign-vue-next';
import store from "@/store/index.js";
import {APIUrl, fileService} from "@/api/apiConfig.js";
import {getFriendGroups, launchFriendApply} from "@/api/user/friend.js";
import {createChannel, createGroup} from "@/api/home/home.js";

const checkGroupId=computed(()=>store.state.messageAbout.checkGroupId)
const uploadFlag = ref(false)
const avatarFiles = ref([]);
const avatar = ref();
const uploadUrl = APIUrl + fileService + '/oss/upload'
let formVisible = computed(() => store.state.sendMsgAbout.createChannelVisible)
let channelParam = ref({
  groupId: '',
  channelName: '',
  iconUrl: '',
  channelType: '1',
  channelTopic: '',
})
let iniCreateChannel = ref({
  groupId: '',
  channelName: '',
  iconUrl: '',
  channelType: '1',
  channelTopic: '',
})


const send = async () => {
  console.log("channelParam", channelParam.value)
  channelParam.value.groupId = checkGroupId.value
  await createChannel(channelParam.value).then((res) => {
    let resp = res.data;
    console.log(resp)
    if (resp.code === 200) {
      MessagePlugin.success(resp.msg)
      //置空参数
      channelParam.value = iniCreateChannel.value
      //更新用户频道列表
      store.dispatch('messageAbout/checkGroup',checkGroupId.value)

      store.commit('sendMsgAbout/setCreateChannelVisible', false)
    }
  });
}

const onClickCloseBtn = () => {
  store.commit('sendMsgAbout/setCreateChannelVisible', false)
};

const handleFail = ({file}) => {
  MessagePlugin.error(`文件 ${file.name} 上传失败`);
};
const handleSuccess = (params) => {
  let resp = params.response;
  console.log("Resp", resp)
  channelParam.value.iconUrl = resp.url

  uploadFlag.value = true

  MessagePlugin.success('上传成功');
};
//格式化返回数据
const formatResponse = (res) => {
  return {
    url: res.data.fileUrl,
    name: res.data.fileName,
  };
};


</script>
