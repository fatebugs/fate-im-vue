<template>
    <t-menu theme="dark" default-value="item2"
            style=" width: 9.6vw;"
            :collapsed="collapsed" height="550px"
            @change="changeHandler"
    >

        <t-menu-group title="主导航">
            <t-menu-item value="item1"
                         name="item1"
            to="/home/userMsg"
            >
                <template #icon>
                    <t-icon name="user" />
                </template>
                私信
            </t-menu-item>
        </t-menu-group>
        <t-menu-group title="群聊">
            <t-menu-item value="2-4">
                <template #icon>
                    <t-icon name="usergroup" />
                </template>
                群聊
            </t-menu-item>
        </t-menu-group>
        <t-menu-group title="更多">
            <t-menu-item value="item3">
                <template #icon>
                    <t-icon name="setting" />
                </template>
                个人资料
            </t-menu-item>
            <t-menu-item value="item4">
                <template #icon>
                    <t-icon name="login" />
                </template>
                退出登录
            </t-menu-item>
        </t-menu-group>
<!--        <template #operations>
            <t-button ghost class="t-demo-collapse-btn" variant="text" shape="square" @click="changeCollapsed">
                <template #icon><t-icon name="view-list" /></template>
            </t-button>
        </template>-->
    </t-menu>
</template>

<script setup>

const collapsed = ref(false);

/*const changeCollapsed = () => {
    collapsed.value = !collapsed.value;
};*/

const changeHandler = (active) => {
    console.log('change', active);
};
</script>

<style scoped>

</style>
