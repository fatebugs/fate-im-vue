<template>
  <t-dialog :footer="false" :visible="formVisible" :width="680" header="选择好友分组">
    <template #body>
      <t-form>
        <t-form-item label="新增好友分组?">
          <t-input
              v-model="userGroupName"
              align="center"
              autofocus
              clearable
              placeholder="请输入分组名称"
          />
          <t-button style="margin-left: 10px" theme="primary" @click="addFriendGroup">确定</t-button>
        </t-form-item>
        <t-form-item>
          <t-radio-group
              default-value=""
              @change="onChange">
            <t-radio value="">默认分组</t-radio>
            <t-radio v-for="(item,index) in groupList"
                     :key="index"
                     :value="item.groupUuid">{{ item.groupName }}
            </t-radio>
          </t-radio-group>
        </t-form-item>

      </t-form>
      <br>
      <t-button variant="outline" @click="onClickCloseBtn">取消</t-button>
      <t-button theme="primary" @click="handleApply">确定</t-button>
    </template>
  </t-dialog>
</template>

<script setup>
import {MessagePlugin} from 'tdesign-vue-next';
import store from "@/store/index.js";
import {APIUrl, fileService} from "@/api/apiConfig.js";
import {createFriendGroup, getFriendGroups, handleFriendApply} from "@/api/user/friend.js";

let formVisible = computed(() => store.state.sendMsgAbout.userFriendVisible)
let groupid = ref('')

let groupList = ref([])

let userGroupName = ref('')

//获取父页面传递的data值
let props = defineProps(['applyUuid']);
let applyUuid = toRefs(props).applyUuid

//获取父页面传递的方法
let emit = defineEmits(['getApplyList'])

const onClickCloseBtn = () => {
  store.commit('sendMsgAbout/setUserFriendVisible', false)
};

//处理好友申请
function handleApply() {
  console.log(applyUuid.value)
  let data = {
    applyUuid: applyUuid.value,
    fromFriendGroup: groupid.value,
    applyStats: "1"
  }
  //处理好友申请
  handleFriendApply(data).then((res) => {
    let resp = res.data;
    console.log(resp)
    if (resp.code === 200) {
      MessagePlugin.success(resp.msg)
      store.commit('sendMsgAbout/setUserFriendVisible', false)
      emit('getApplyList')
      store.dispatch('messageAbout/getFriendList')
    }
  });
}

const value = ref('');
const onChange = (checkedValues) => {
  groupid.value = checkedValues
};


watch(formVisible, (newVal) => {
  if (newVal) {
    getFriendGroup()
  } else {
    groupList.value = []
    value.value = ''
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

//新增好友分组
function addFriendGroup() {
  let param = {
    groupName: userGroupName.value,
    groupType: "1"
  }
  createFriendGroup(param).then((res) => {
    let resp = res.data;
    console.log(resp)
    if (resp.code === 200) {
      MessagePlugin.success(resp.msg)
      getFriendGroup()
    }
  });
}

</script>
