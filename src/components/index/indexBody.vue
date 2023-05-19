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
                        {{ !loginFlag.flag ? "登录以继续" : "开始" }}
                        <i-ep-Promotion></i-ep-Promotion>
                    </el-button>
                </div>
            </t-col>
            <t-col :span="2">
            </t-col>
        </t-row>
    </div>
</template>

<script setup>
import router from "@/router/index.js";


let loginFlag = reactive(
    {
        "flag": false
    }
)

function openLoginPage() {
    if (!loginFlag.flag) {
        router.push({
            name: "Login"
        })
    } else {
        router.push({
            name: "HomePage"
        })
    }

}

onMounted(() => {
    let token = window.sessionStorage.getItem("session_token");
    loginFlag.flag = !token;
})

const UserDetails = {
    beforeRouteEnter(to, from) {
        // 在渲染该组件的对应路由被验证前调用
        // 不能获取组件实例 `this` ！
        // 因为当守卫执行时，组件实例还没被创建！

    },
    beforeRouteUpdate(to, from) {
        // 在当前路由改变，但是该组件被复用时调用
        // 举例来说，对于一个带有动态参数的路径 `/users/:id`，在 `/users/1` 和 `/users/2` 之间跳转的时候，
        // 由于会渲染同样的 `UserDetails` 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
        // 因为在这种情况发生的时候，组件已经挂载好了，导航守卫可以访问组件实例 `this`
    },
    beforeRouteLeave(to, from) {
        // 在导航离开渲染该组件的对应路由时调用
        // 与 `beforeRouteUpdate` 一样，它可以访问组件实例 `this`
    },
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
