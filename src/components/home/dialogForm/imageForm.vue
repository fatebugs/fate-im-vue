<template>
  <t-dialog :visible="formVisible" header="发送图片" :width="680" :footer="false">
    <template #body>
      <t-upload
          v-model="imgFile"
          :action="uploadUrl"
          theme="image-flow"
          accept="image/*"
          multiple
          :auto-upload="true"
          :locale="{
                        triggerUploadText: {
                          image: '请选择图片',
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

let formVisible = computed(()=>store.state.sendMsgAbout.formVisible)

//获取父页面传递的data值
let props = defineProps(['data']);
const data=toRefs(props).data


const onClickCloseBtn = () => {
  store.commit('sendMsgAbout/setFormVisible', false)
  //清空数据
  imgFile.value = []
};

//文件上传
const imgFile = ref([]);


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
  console.log(imgFile.value)
  //收集所有的url,第一张和最后一张之间用逗号隔开
  let imgUrls = ''
  for (let i = 0; i < imgFile.value.length; i++) {
    if (i === 0) {
      imgUrls = imgFile.value[i].url
    } else {
      imgUrls = imgUrls + ',' + imgFile.value[i].url
    }
  }
  console.log(imgUrls)
  let msg={
    content:imgUrls,
    contentType:'1',
  }
  if (data === 1) {
    store.dispatch('messageAbout/sendMessage', msg)
  }else {
    store.dispatch('messageAbout/sendGroupMessage', msg)
  }


  imgFile.value = []
  store.commit('sendMsgAbout/setFormVisible', false)

};


</script>
