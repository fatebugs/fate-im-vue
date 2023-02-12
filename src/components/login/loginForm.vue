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
              <a href="#">忘记密码了？</a>
        </span>
    </div>
</template>

<script setup>

import {login} from "@/api/user/login.js";
import AESUtils from "@/utils/AESUtils.js";


let user = reactive({
    userName: 'fate',
    userPassword: 'fatebugs'
})

let result = reactive({})

async function userLogin() {
    let userParam = JSON.parse(JSON.stringify(user));
    userParam.userPassword = AESUtils.encrypt(userParam.userPassword)

    await login(userParam).then((res) => {
            result = res.data;
            sessionStorage.setItem("session_token", res.data.data.token)
        }
    );
    console.log(sessionStorage.getItem("session_token"))
}


</script>

<style scoped>

</style>
