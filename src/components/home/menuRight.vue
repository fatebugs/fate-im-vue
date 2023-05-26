<template>
  <t-menu :collapsed="collapsed" default-value="item2"
          height="550px"
          style=" width: 9.6vw;" theme="dark"
          @change="changeHandler"
  >

    <t-menu-group title="主导航">
      <t-menu-item name="item1"
                   to="/home/userMsg"
                   value="item1"
      >
        <template #icon>
          <t-icon name="user"/>
        </template>
        私信
      </t-menu-item>
    </t-menu-group>
    <t-menu-group title="群聊">
      <t-menu-item name="item2"
                   to="/home/groupMsg"
                   value="2-4"
      >
        <template #icon>
          <t-icon name="usergroup"/>
        </template>
        群聊
      </t-menu-item>
    </t-menu-group>
    <t-menu-group title="更多">
      <t-menu-item value="item3"
                    to="/home/userInfo"
      >
        <template #icon>
          <t-icon name="setting"/>
        </template>
        个人资料
      </t-menu-item>
      <t-popconfirm
          :visible="visible"
          content="是否退出登录"
          theme="default"
          @visible-change="onVisibleChange"
      >
        <t-menu-item value="item4">
          <template #icon>
            <t-icon name="login"/>
          </template>
          退出登录
        </t-menu-item>
      </t-popconfirm>
    </t-menu-group>
    <!--        <template #operations>
                <t-button ghost class="t-demo-collapse-btn" variant="text" shape="square" @click="changeCollapsed">
                    <template #icon><t-icon name="view-list" /></template>
                </t-button>
            </template>-->
  </t-menu>
</template>

<script setup>

import {logout} from "@/api/user/login.js";
import store from "@/store/index.js";
import {TokenInfo} from "@/model/TokenInfo.js";
import router from "@/router/index.js";
import {MessagePlugin} from 'tdesign-vue-next';

const collapsed = ref(false);
const visible = ref(false);

const onVisibleChange = async (val, context = {}) => {
  if (context && context.trigger === 'confirm') {
    await logout().then(
        (res) => {
          MessagePlugin.success("退出成功")
          localStorage.removeItem("session_token")
          store.commit('userAbout/setTokenInfo', new TokenInfo())
          store.dispatch('messageAbout/initAllMsgList')
          //关闭websocket
          store.dispatch('messageAbout/closeWebSocket')

          router.push({
            name: "Index",
          })
        }
    )
  } else {
    visible.value = val;
  }
};
const changeHandler = (active) => {
  console.log('change', active);
};
</script>

<style scoped>

</style>
