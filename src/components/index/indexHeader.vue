<template>
  <div class="box" style="border-bottom: 1px solid #dedede">
    <t-head-menu default-value="2-1" expand-type="popup">
      <template #logo>
        <img alt="logo" height="50" src="../../assets/image/logo.png" style="margin-left:300px"/>
      </template>

      <template #operations>
        <t-menu-item value="item1"> API</t-menu-item>
        <div class="t-demo-menu" style="margin-right: 300px">
          <t-button shape="square" @click="openLoginPage" variant="text">
            <template #icon>
              <t-icon name="user"/>
            </template>
          </t-button>
          <t-button shape="square" variant="text">
            <template #icon>
              <t-icon name="ellipsis"/>
            </template>
          </t-button>
        </div>
      </template>
    </t-head-menu>
  </div>
</template>
<script>
import router from "@/router/index.js";

export default {
  name: "indexHeader",
  methods:{
    openLoginPage() {
      router.push({
        name: "Login",
      })
    }
  }
}
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

