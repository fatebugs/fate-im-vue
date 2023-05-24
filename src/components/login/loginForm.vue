<template>
    <div id="login"><!-- 登录注册切换动画 -->
        <div id="status">
            <i style="top: 0">登录</i>
        </div>
        <span>
              <p class="form">
                  <input id="user" v-model="user.userName" placeholder="用户名" type="text"/>
              </p>
              <p class="form">
                  <input id="passwd" v-model="user.userPassword" placeholder="密码" type="password"/>
              </p>
              <input class="btn" style="margin-right: 20px;" type="button" value="登录" @click="userLogin"/>

              <router-link to="/">忘记密码了？</router-link>
              <input class="btn" style="margin-right: 20px;" type="button" value="没有账号注册" @click="upRlFlag"/>
        </span>
    </div>
</template>

<script setup>

import {login} from "@/api/user/login.js";
import AESUtils from "@/utils/AESUtils.js";
import {useRouter} from "vue-router";
import { MessagePlugin } from 'tdesign-vue-next';
import {useStore} from "vuex";




let user = reactive({
    userName: 'fate',
    userPassword: 'fatebugs'
})

let result = reactive({})

const router = useRouter()
const store = useStore()

async function userLogin() {
    let userParam = JSON.parse(JSON.stringify(user));
    userParam.userPassword = AESUtils.encrypt(userParam.userPassword)

    await login(userParam).then(
        (res) => {
            result = res.data;
            if (result.code===200){
                localStorage.setItem("session_token", result.data.token)
                store.commit('userAbout/setTokenInfo', result.data)
                store.dispatch('messageAbout/initAllMsgList')

                router.push({
                    name:"UserMsg"
                });
            }else {
                MessagePlugin.error(result.msg)
            }

        }
    );
}
function upRlFlag() {
    store.commit('userAbout/setRlFlag',false)
}


</script>

<style scoped>

</style>
