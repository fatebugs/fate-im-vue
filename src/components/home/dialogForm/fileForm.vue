<template>
  <t-dialog :footer="false" :visible="formVisible" :width="680" header="发送文件">
    <template #body>
      <t-upload
          v-model="files"
          :action="uploadUrl"
          :auto-upload="true"
          :format-response="formatResponse"
          :locale="{
                        triggerUploadText: {
                          image: '发送文件',
                        },
                      }"
          accept="video/*"
          multiple
          theme="file-flow"
          @fail="handleFail"
          @success="handleSuccess"
      ></t-upload>
      <t-button variant="outline" @click="onClickCloseBtn">取消</t-button>
      <t-button theme="primary" @click="sendImgMsg">确定</t-button>
    </template>
  </t-dialog>
</template>

<script setup>
import {MessagePlugin} from 'tdesign-vue-next';
import store from "@/store/index.js";
import {APIUrl, fileService} from "@/api/apiConfig.js";

let formVisible = computed(() => store.state.sendMsgAbout.fileVisible)

//获取父页面传递的data值
let props = defineProps(['data']);
const data = toRefs(props).data

const onClickCloseBtn = () => {
  store.commit('sendMsgAbout/setFileVisible', false)
  //清空数据
  files.value = []
};

//文件上传
const files = ref([]);


const uploadUrl = APIUrl + fileService + '/oss/upload'
const handleFail = ({file}) => {
  MessagePlugin.error(`文件 ${file.name} 上传失败`);
};

const handleSuccess = ({file, response}) => {
  MessagePlugin.success(`文件 ${file.name} 上传成功`);
  console.log(response)

};

//格式化返回数据
const formatResponse = (res) => {
  return {
    url: res.data.fileUrl,
    name: res.data.fileName,
  };
};

//发送图片消息
const sendImgMsg = () => {
  //转换为消息格式
  console.log(files.value)
  //收集所有的url,第一张和最后一张之间用分号隔开
  let fileUrls = ''
  for (let i = 0; i < files.value.length; i++) {
    if (i === 0) {
      fileUrls = files.value[i].url
    } else {
      fileUrls = fileUrls + ';' + files.value[i].url
    }
  }
  console.log(fileUrls)
  let msg = {
    content: fileUrls,
    contentType: '4',
  }

  if (data === 1) {
    store.dispatch('messageAbout/sendMessage', msg)
  } else {
    store.dispatch('messageAbout/sendGroupMessage', msg)
  }

  files.value = []
  store.commit('sendMsgAbout/setFileVisible', false)

};


</script>
