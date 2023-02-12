<template>
  <div class="tdesign-demo-item--grid">
    <t-row>
      <t-col :span="2">
      </t-col>
      <t-col :span="8">
        <div class="body-open" style="">

          <h1 class="tagline">
            <span class="text-gradient accent ">可拓展</span>
            <br>
            <span class="text-gradient"
                  style="background-image: linear-gradient(to left, #455765, #455765);">即时通讯服务</span>
          </h1>
        </div>
        <div class="body-opne-button">
          <el-button round size="large" type="success" @click="openLoginPage">

            {{ !loginFlag ? "登录以继续" : "开始" }}
            <i-ep-Promotion></i-ep-Promotion>
          </el-button>
        </div>
      </t-col>
      <t-col :span="2">
      </t-col>
    </t-row>
  </div>
</template>

<script>
import router from "@/router/index.js";
import store from "@/store/index.js";


export default {
  name: "indexBody",
  data() {
    return {
      loginFlag: false
    }
  },
  methods: {
    openLoginPage() {
      router.push({
        name: !this.loginFlag ? "Login" : "HomePage"
      })
    }
  },
  onMounted: {
    checkLogin() {
      if (!window.sessionStorage.getItem("session_token") == null) {
        this.loginFlag = true
        store.state.commit()
      }
    },
  }
}
</script>

<style scoped>
/*文字渐变色*/
.text-gradient {
  background-image: linear-gradient(to right, #42d392 25%, #647eff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;

}

.body-opne-button {
  display: flex;
  align-items: center;
  justify-content: center;
}

.body-open {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 400px;
  max-width: 960px;
  line-height: 1.25;
  filter: blur();
  text-align: center;
  margin: 0 auto;
  letter-spacing: -1.5px;
  font-family: Quotes, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;


}

.tagline {
  font-size: 76px;
  vertical-align: middle;
  letter-spacing: 6px;


}

.accent {
  display: inline-block;
  margin: 30px;
}
</style>
