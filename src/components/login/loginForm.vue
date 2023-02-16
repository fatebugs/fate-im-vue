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
        </span>
    </div>
</template>

<script setup>

import {login} from "@/api/user/login.js";
import AESUtils from "@/utils/AESUtils.js";
import {useRouter} from "vue-router";


let user = reactive({
    userName: 'fate',
    userPassword: 'fatebugs'
})

let result = reactive({})

const router = useRouter()

async function userLogin() {
    let userParam = JSON.parse(JSON.stringify(user));
    userParam.userPassword = AESUtils.encrypt(userParam.userPassword)

    await login(userParam).then(
        (res) => {
            result = res.data;
            sessionStorage.setItem("session_token", result.data.token)
            sessionStorage.setItem("userInfoAvatar", result.data.user.userInfoAvatar)
            if (result.code===200){
                router.push({
                    name:"HomePage"
                });
            }

        }
    );
}


</script>

<style scoped>

</style>
