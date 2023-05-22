<template>
  <index-header></index-header>
  <div id="bg">
    <div id="login_wrap">
      <login-form v-show="rlFlag"></login-form>
      <register-form v-show="!rlFlag"></register-form>


      <div id="login_img"><!-- 图片绘制框 -->
        <span class="circle">
                    <span></span>
                    <span></span>
                </span>
        <span class="star">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                </span>
        <span class="fly_star">
                    <span></span>
                    <span></span>
                </span>
        <p id="title">CLOUD</p>
      </div>
    </div>
  </div>
</template>

<script>

import "@/assets/css/login.css"
import {getList} from "@/api/home/home.js";
import AESUtils from "@/utils/AESUtils.js";
import LoginForm from "@/components/login/loginForm.vue";
import IndexHeader from "@/components/index/indexHeader.vue";
import Register from "@/components/login/registerForm.vue";
import RegisterForm from "@/components/login/registerForm.vue";
import store from "@/store/index.js";

export default {
  name: "Login",
  components: {RegisterForm, Register, IndexHeader, LoginForm},
  data() {
    return {
      onoff: true,
    }
  },
  onMounted() {
    this.login()
  },
  methods: {},
  setup(){
    let rlFlag = computed(() => {
      return store.state.userAbout.rlFlag
    })


    onMounted(() => {
      // store.commit('userAbout/setRlFlag',true)
      store.state.userAbout.rlFlag=true
    })


    return{
      rlFlag
    }
  }
};
</script>

<style lang="less" scoped>

</style>
