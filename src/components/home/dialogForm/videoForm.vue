<template>
  <t-dialog :visible="formVisible" header="发送视频" :width="680" :footer="false">
    <template #body>
      <t-upload
          v-model="files"
          :action="uploadUrl"
          theme="file-flow"
          accept="video/*"
          multiple
          :auto-upload="true"
          :locale="{
                        triggerUploadText: {
                          image: '请选择视频',
                        },
                      }"
          @fail="handleFail"
          @success="handleSuccess"
          :format-response="formatResponse"
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

let formVisible = computed(()=>store.state.sendMsgAbout.videoVisible)

//获取父页面传递的data值
let props = defineProps(['data']);
const data=toRefs(props).data

const onClickCloseBtn = () => {
  store.commit('sendMsgAbout/setVideoVisible', false)
};

//文件上传
const files = ref([]);


const uploadUrl = APIUrl+fileService+'/oss/upload'
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
  //收集所有的url,第一张和最后一张之间用逗号隔开
  let imgUrls = ''
  for (let i = 0; i < files.value.length; i++) {
    if (i === 0) {
      imgUrls = files.value[i].url
    } else {
      imgUrls = imgUrls + ';' + files.value[i].url
    }
  }
  console.log(imgUrls)
  let msg={
    content:imgUrls,
    contentType:'3',
  }

  if (data === 1) {
    store.dispatch('messageAbout/sendMessage', msg)
  }else {
    store.dispatch('messageAbout/sendGroupMessage', msg)
  }

  files.value = []
  store.commit('sendMsgAbout/setVideoVisible', false)

};


</script>
