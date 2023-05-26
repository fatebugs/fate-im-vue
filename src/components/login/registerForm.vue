<template>
  <div id="login"><!-- 登录注册切换动画 -->
    <div id="status">
      <i style="top: 0">注册</i>
    </div>
    <span v-show="!flag">
              <p class="form">
                  <input id="userName" v-model="user.userName" placeholder="用户名" type="text"/>
              </p>
              <p class="form">
                  <input id="userPassword" v-model="user.userPassword" placeholder="密码" type="password"/>
              </p>
              <p class="form">
                  <input id="userEmail" v-model="user.userEmail" placeholder="邮箱" type="email"/>
              </p>
              <p class="form">
                  <input id="userPhoneNumber" v-model="user.userPhoneNumber" placeholder="手机号码" type="text"/>
              </p>
              <input class="btn" style="margin-right: 20px;" type="button" value="下一步" @click="nextStep"/>
            <input class="btn" style="margin: auto;" type="button" value="已有账号去登录" @click="upRlFlag"/>

        </span>

    <span v-show="flag">
              <p class="form">
                  <t-upload
                      ref="avatar"
                      v-model="avatarFiles"
                      :action="uploadUrl"
                      theme="image"
                      accept="image/*"
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

                  <input id="nickname" v-model="user.nickname" placeholder="昵称" type="text"/>

                  <input id="userInfoBirthday" v-model="user.userInfoBirthday" placeholder="生日" type="date"/>

                  <input id="userInfoSignature" v-model="user.userInfoSignature" placeholder="个人简介" type="text"/>
              </p>

              <input class="btn" style="margin-right: 20px;" type="button" value="注册" @click="userRegister"/>
              <input class="btn" style="margin-right: 20px;" type="button" value="上一步" @click="previousStep"/>
            <input v-show="!uploadFlag" class="btn"
                   style="
                   display: flex;
                    justify-content: center; /* 横向居中 */
                    align-items: center; /* 纵向居中 */"
                   type="button" value="已有账号去登录" @click="upRlFlag"/>


        </span>

  </div>
</template>

<script setup>
import {RegisterUser} from "@/model/RegisterUser.js";
import store from "@/store/index.js";
import {register, registerCheck} from "@/api/user/login.js";
import {MessagePlugin} from 'tdesign-vue-next';
import AESUtils from "@/utils/AESUtils.js";
import {APIUrl, fileService} from "@/api/apiConfig.js";
import router from "@/router/index.js";

const uploadUrl = APIUrl+fileService+'/oss/upload'


const flag = ref(false)
const uploadFlag = ref(false)
const avatar = ref();
const avatarFiles = ref([]);

const user = ref(new RegisterUser())
const userReq=ref(new RegisterUser())

//注册上一步，重新填写
const previousStep = () => {
  flag.value = false
}

//注册下一步，填写个人信息
const nextStep = async () => {
  userReq.value = JSON.parse(JSON.stringify(user.value))
  userReq.value.userPassword=AESUtils.encrypt(user.value.userPassword)
  await registerCheck(userReq.value).then(
      (res) => {
        let data = res.data;
        if (data.code === 200) {
          flag.value = true
        } else {
          MessagePlugin.error(res.data.msg)
        }
      }
  )
}

const userRegister =async () => {
  userReq.value = JSON.parse(JSON.stringify(user.value))
  userReq.value.userPassword=AESUtils.encrypt(user.value.userPassword)
  console.log(userReq.value)
  await register(userReq.value).then(
      (res) => {
        console.log(res)
        const result = res.data;
        if (result.code===200){
          localStorage.setItem("session_token", result.data.token)
          store.commit('userAbout/setTokenInfo', result.data)
          router.push({
            name:"UserMsg"
          });
        }else {
          MessagePlugin.error(result.msg)
        }
      }
  )

}


function upRlFlag() {
  store.commit('userAbout/setRlFlag', true)
}

const handleFail = ({file}) => {
  MessagePlugin.error(`文件 ${file.name} 上传失败`);
};
const handleSuccess = (params) => {
  let resp = params.response;
  console.log("Resp",resp)
  user.value.userInfoAvatar = resp.url

  uploadFlag.value = true

  MessagePlugin.success('上传成功');
};

//格式化返回数据
const formatResponse = (res) => {
  return {
    url: res.data.fileUrl,
    name: res.data.fileName,
  };
};

</script>
<style scoped>

#login span{
  text-align: left;
  position: absolute;
  left: 50%;
  margin-left: -150px;
  top: 45%;
  margin-top: -140px;
}

</style>
