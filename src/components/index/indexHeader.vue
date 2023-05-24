<template>
  <div class="box" style="border-bottom: 1px solid #dedede">
    <t-head-menu default-value="2-1" expand-type="popup">
      <template #logo>
        <t-button shape="rectangle" style="height: 54px;margin-left:300px" tag="div" variant="text">
          <div @click="goIndex">
            <img alt="logo" height="50" src="../../assets/image/logo.png"/>
          </div>
        </t-button>
      </template>

      <template #operations>
        <t-menu-item value="item1">API</t-menu-item>
        <div class="t-demo-menu" style="margin-right: 300px">
          <t-button v-if="!loginFlag" shape="square" variant="text" @click="openLoginPage">
            <template #icon>
              <t-icon name="user" size="20px"/>
            </template>
          </t-button>
          <t-dropdown v-if="loginFlag" :options="options" @click="clickHandler">
            <t-button  shape="circle" variant="text">
              <template #icon>
                <t-avatar :image="userInfo.user.userInfoAvatar" alt="用户头像" hideOnLoadFailed/>
              </template>
            </t-button>
          </t-dropdown>

<!--          <t-badge :count="2" size="small">
            <t-button shape="square" variant="text">
              <template #icon>
                <t-icon name="mail" size="20px"/>
              </template>
            </t-button>
          </t-badge>-->

          <!-- 全局通知 -->
          <notice />
        </div>
      </template>
    </t-head-menu>
  </div>
</template>
<script setup>
import router from "@/router/index.js";
import {MessagePlugin} from 'tdesign-vue-next';
import {logout} from "@/api/user/login.js";
import store from "@/store/index.js";
import {TokenInfo} from "@/model/TokenInfo.js";
import Notice from "@/components/index/Notice.vue";

const options = [
  {content: '修改账号信息', value: 1},
  {content: '退出登录', value: 2}
];
const clickHandler = async (data) => {
  console.log(data)
  if (data.value === 2) {
    await logout().then(
        (res) => {
          MessagePlugin.success("退出成功")
          localStorage.removeItem("session_token")
          store.commit('userAbout/setTokenInfo',new TokenInfo())
          store.dispatch('messageAbout/initAllMsgList')
          //关闭websocket
          store.dispatch('messageAbout/closeWebSocket')

          router.push({
            name: "Index",
          })
        }
    )
  }
};

let userInfo = computed(() => {
  return useStore().state.userAbout.tokenInfo
})

let loginFlag = computed(() => {
  return !!localStorage.getItem('session_token')
})

function openLoginPage() {
  router.push({
    name: "Login",
  })
}

function goIndex() {
  router.push({
    name: "Index",
  })
}

onMounted(() => {
  //挂载时获取基础信息

})

</script>
<style lang="less" scoped>
.t-menu__operations {
  .t-button {
    margin-left: 8px;
  }
}

.t-demo-menu--dark {
  .t-button {
    color: #fff;

    &:hover {
      background-color: #4b4b4b;
      border-color: transparent;
      --ripple-color: #383838;
    }
  }
}
</style>

