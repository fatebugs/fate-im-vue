<template>
  <t-form :data="loginUser" class="userInfoForm" reset-type="initial">
    <t-form-item label="头像">
      <t-upload v-show="editFlag"
                ref="avatar"
                v-model="avatarFiles"
                :action="uploadUrl"
                :auto-upload="true"
                :format-response="formatResponse"
                :locale="{
                        triggerUploadText: {
                          image: '请选择图片',
                        },
                      }"
                accept="image/*"
                theme="image"
                @fail="handleFail"
                @success="handleSuccess"
      ></t-upload>
      <t-image
          v-show="!editFlag"
          :src="loginUser.userInfoAvatar"
          :style="{ width: '120px', height: '120px' }"
          fit="cover"
          shape="circle"
      />
    </t-form-item>

    <t-form-item label="昵称"
                 name="nickname">
      <t-input v-model="loginUser.userInfoNickname" :disabled="!editFlag"
               placeholder="请输入内容"
      />
    </t-form-item>
    <t-form-item label="用户名"
                 name="name">
      <t-input v-model="loginUser.userName"
               :disabled="true"
               placeholder="请输入内容"
      />
    </t-form-item>
    <t-form-item label="手机号码" name="tel">
      <t-input v-model="loginUser.userPhoneNumber" :disabled="!editFlag"
               placeholder="请输入内容"
      />
    </t-form-item>
    <t-form-item label="邮箱" name="email">
      <t-input v-model="loginUser.userEmail" :disabled="!editFlag"
               placeholder="请输入内容"
      />
    </t-form-item>
    <t-form-item label="性别" name="Gender">
      <t-radio-group v-model="loginUser.userInfoGender" :defaultValue="gender" :disabled="!editFlag">
        <t-radio :value="1">男</t-radio>
        <t-radio :value="0">女</t-radio>
      </t-radio-group>
    </t-form-item>
    <t-form-item label="生日" name="birthday">
      <t-date-picker v-model="loginUser.userInfoBirthday" :disabled="!editFlag"
                     placeholder="请选择日期"
                     type="date"
      />
    </t-form-item>

    <t-form-item label="个性签名" name="signature">
      <t-input v-model="loginUser.userInfoSignature" :disabled="!editFlag"
               placeholder="请输入内容"
      />
    </t-form-item>

    <t-form-item v-show="editFlag"
                 label="密码" name="userPassword">
      <t-input v-model="loginUser.userPassword"
               placeholder="请输入内容"
      />
    </t-form-item>
    <t-form-item v-show="editFlag"
                 label="确认密码" name="rePassword">
      <t-input v-model="loginUser.rePassword"
               placeholder="请输入内容"
      />
    </t-form-item>
    <!--    提交-->
    <t-form-item v-show="!editFlag">
      <t-button type="submit" @click="lunchEdit">修改</t-button>
    </t-form-item>
    <t-form-item v-show="editFlag">
      <t-button type="submit" @click="editUserInfo">提交</t-button>
      <t-button style="margin: 20px" @click="cancelEdit">取消</t-button>
    </t-form-item>

  </t-form>

</template>

<script setup>

import {APIUrl, fileService} from "@/api/apiConfig.js";
import user from "@/store/user/user.js";
import {MessagePlugin} from 'tdesign-vue-next';
import {getLoginUser, logout, updateUserInfo} from "@/api/user/login.js";
import AESUtils from "@/utils/AESUtils.js";
import router from "@/router/index.js";
import store from "@/store/index.js";


let userInfo = ref({
  userUuid: '',
  userName: '',
  userEmail: '',
  userPhoneNumber: '',
  userPassword: '',
  userInfoNickname: '',
  userInfoAvatar: '',
  userInfoGender: 0,
  userInfoBirthday: '',
  userInfoSignature: '',
  rePassword: '',
})
const avatarFiles = ref([]);
const avatar = ref();
const uploadUrl = APIUrl + fileService + '/oss/upload'
const uploadFlag = ref(false)
const loginUser = ref({
  userUuid: '',
  userName: '',
  userEmail: '',
  userPhoneNumber: '',
  userPassword: '',
  userInfoNickname: '',
  userInfoAvatar: '',
  userInfoGender: 0,
  userInfoBirthday: '',
  userInfoSignature: '',
  rePassword: '',
})
const editFlag = ref(false)
const gender = ref(0)


onMounted(async () => {
  //获取用户信息
  await getLoginUser().then(
      res => {
        console.log("res", res.data)
        loginUser.value = {
          ...res.data.data
        }
      }
  )
})


const handleFail = ({file}) => {
  MessagePlugin.error(`文件 ${file.name} 上传失败`);
};
const handleSuccess = (params) => {
  let resp = params.response;
  console.log("Resp", resp)
  loginUser.value.userInfoAvatar = resp.url

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

//修改用户信息
const editUserInfo = () => {
  let pawFlag = false
  //把用户信息和修改的信息合并
  userInfo.value = {
    ...loginUser.value,
  }
  //如果填写了修改密码
  if (userInfo.value.userPassword) {
    //判断两次密码是否一致
    if (userInfo.value.userPassword !== userInfo.value.rePassword) {
      MessagePlugin.error('两次密码不一致');
      return
    }
    userInfo.value.userPassword = AESUtils.encrypt(userInfo.value.userPassword)
    pawFlag = true
  }
  updateUserInfo(userInfo.value).then(
      res => {
        if (res.data.code === 200) {
          console.log("res", res.data.data)
          MessagePlugin.success('修改成功');
          if (pawFlag) {
            logout()
            router.push('/login')
          }

          localStorage.setItem("session_token", res.data.data.token)
          store.commit('userAbout/setTokenInfo', res.data.data)
          store.dispatch('messageAbout/initAllMsgList')
          editFlag.value = false

          //重置表单
          resetForm()
          //获取用户信息
          getLoginUser().then(
              resa => {
                if (resa.data.code === 200) {
                  loginUser.value = {
                    ...resa.data.data
                  }
                }
              }
          )
        } else {
          MessagePlugin.error('修改失败');
        }
      }
  )

}
//重置表单
const resetForm = () => {
  userInfo.value = {
    userUuid: '',
    userName: '',
    userEmail: '',
    userPhoneNumber: '',
    userPassword: '',
    userInfoNickname: '',
    userInfoAvatar: '',
    userInfoGender: '',
    userInfoBirthday: '',
    userInfoSignature: '',
    rePassword: '',
  }
  avatarFiles.value = []
  uploadFlag.value = false
}

//点击修改按钮
const lunchEdit = () => {
  editFlag.value = true
}
const cancelEdit = async () => {
  //获取用户信息
  await getLoginUser().then(
      res => {
        console.log("res", res.data)
        loginUser.value = {
          ...res.data.data
        }
      }
  )
  editFlag.value = false
}

</script>

<style scoped>
.userInfoForm {
  margin: auto;
  text-align: center;

}

</style>
