<template>
  <t-space direction="vertical" style="width: 99vw;">
    <t-layout style="height: 97vh">
      <t-header>
        <index-header></index-header>
      </t-header>
      <t-layout>
        <t-aside style="height:92vh;border-top: 1px solid var(--component-border);">
          <menu-right></menu-right>
        </t-aside>

        <router-view ></router-view>

      </t-layout>
    </t-layout>
  </t-space>
</template>

<script setup>
import IndexHeader from "@/components/index/indexHeader.vue";
import MenuRight from "@/components/home/menuRight.vue";
import ContactList from "@/components/home/contactList.vue";

let store = useStore();

</script>

<style scoped>
:root {
  --component-border: 1px solid black;
}

.userChatList {
  background: linear-gradient(to bottom, #4286f4, #b0b0b0);
}


.t-layout__sider {
  width: auto;
}

.my-component {
  border: var(--component-border);
  /* other styles */
}
</style>
