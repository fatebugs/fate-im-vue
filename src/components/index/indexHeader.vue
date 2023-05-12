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
                    <t-button v-if="!userInfo.userInfoAvatar" shape="square" variant="text" @click="openLoginPage">
                        <template #icon>
                            <t-icon name="user" size="20px"/>
                        </template>
                    </t-button>
                    <t-button v-if="userInfo.userInfoAvatar" shape="circle" variant="text">
                        <template #icon>
                            <t-avatar :image="userInfo.userInfoAvatar" alt="用户头像" hideOnLoadFailed/>
                        </template>
                    </t-button>

                    <t-badge :count="2" size="small">
                        <t-button shape="square" variant="text">
                            <template #icon>
                                <t-icon name="mail" size="20px"/>
                            </template>
                        </t-button>
                    </t-badge>

                </div>
            </template>
        </t-head-menu>
    </div>
</template>
<script setup>
import router from "@/router/index.js";

let userInfo = reactive({
    "userInfoAvatar": 'null'
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
    userInfo.userInfoAvatar = window.localStorage.getItem("userInfoAvatar");
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

