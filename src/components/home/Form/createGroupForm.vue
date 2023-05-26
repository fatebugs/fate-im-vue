<template>
  <t-dialog :footer="false" :visible="formVisible" :width="680" header="创建群聊">
    <template #body>
      <t-form-item label="头像">
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
      <t-form-item label="群组名称" name="name">
        <t-input
            v-model="groupParam.groupName"
            align="center"
            autofocus
            clearable
            placeholder="请输入群组名称"
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
import {createGroup} from "@/api/home/home.js";

const uploadFlag = ref(false)
const avatarFiles = ref([]);
const avatar = ref();
const uploadUrl = APIUrl + fileService + '/oss/upload'
let formVisible = computed(() => store.state.sendMsgAbout.createGroupVisible)
let groupParam = ref({
  groupName: '',
  groupAvatar: '',
  groupType: '1'
})
let iniCreateGroup = ref({
  groupName: '',
  groupAvatar: '',
  groupType: '1'
})


const send = async () => {
  console.log("groupParam", groupParam.value)
  await createGroup(groupParam.value).then((res) => {
    let resp = res.data;
    console.log(resp)
    if (resp.code === 200) {
      MessagePlugin.success(resp.msg)
      //置空参数
      groupParam.value = iniCreateGroup.value
      //更新用户群组列表
      store.dispatch('messageAbout/getUserGroupList')

      store.commit('sendMsgAbout/setCreateGroupVisible', false)
    }
  });
}

const onClickCloseBtn = () => {
  store.commit('sendMsgAbout/setCreateGroupVisible', false)
};

const handleFail = ({file}) => {
  MessagePlugin.error(`文件 ${file.name} 上传失败`);
};
const handleSuccess = (params) => {
  let resp = params.response;
  console.log("Resp", resp)
  groupParam.value.groupAvatar = resp.url

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
