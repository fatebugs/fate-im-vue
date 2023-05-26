<template>
  <t-dialog :footer="false" :visible="formVisible" :width="680" header="发起好友申请">
    <template #body>
      <t-form-item label="申请信息" name="name">
        <t-input
            v-model="applyContent"
            align="center"
            autofocus
            clearable
            placeholder="请输入申请信息"
        />
      </t-form-item>
      <t-form-item label="选择好友分组" name="tel">
        <t-radio-group
            default-value=""
            @change="onChange">
          <t-radio value="">默认分组</t-radio>
          <t-radio v-for="(item,index) in groupList"
                   :key="index"
                   :value="item.groupUuid">{{ item.groupName }}
          </t-radio>
        </t-radio-group>
        <br>

      </t-form-item>

      <t-button variant="outline" @click="onClickCloseBtn">取消</t-button>
      <t-button theme="primary" @click="sendFriendApply">发送</t-button>
    </template>
  </t-dialog>
</template>

<script setup>
import {MessagePlugin} from 'tdesign-vue-next';
import store from "@/store/index.js";
import {APIUrl, fileService} from "@/api/apiConfig.js";
import {getFriendGroups, launchFriendApply} from "@/api/user/friend.js";

let formVisible = computed(() => store.state.sendMsgAbout.userApplyVisible)
let applyContent = ref('')
let checkGroupId = ref('')

let groupList = ref([])

//获取父页面传递的data值
let props = defineProps(['friendId']);
const friendId = toRefs(props).friendId

watch(formVisible, (newVal) => {
  if (newVal) {
    getFriendGroup()
  } else {
    groupList.value = []
    checkGroupId.value = ''
  }
})

//获取好友分组
function getFriendGroup() {
  getFriendGroups().then((res) => {
    let resp = res.data;
    console.log(resp)
    if (resp.code === 200) {
      groupList.value = resp.data
      console.log(groupList.value)
    }
  });
}

const onChange = (checkedValues) => {
  checkGroupId.value = checkedValues
};

const sendFriendApply = async () => {
  let param={
    toUserId:friendId.value,
    applyContent:applyContent.value,
    fromFriendGroup:checkGroupId.value,
    applySource:'web'
  }
  await launchFriendApply(param).then((res) => {
    let resp = res.data;
    console.log(resp)
    if (resp.code === 200) {
      MessagePlugin.success(resp.msg)
      //置空参数
      applyContent.value=''
      checkGroupId.value=''
      store.commit('sendMsgAbout/setUserApplyVisible', false)
    }
  });
}

const onClickCloseBtn = () => {
  store.commit('sendMsgAbout/setUserApplyVisible', false)
};


</script>
