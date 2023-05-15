<template>
    <t-layout>
        <index-header></index-header>
        <t-layout>
            <t-aside style="border-top: 1px solid var(--component-border);">
                <menu-right></menu-right>
            </t-aside>
            <t-aside style="border-top: 1px solid var(--component-border);">
                <contact-list></contact-list>
            </t-aside>
            <t-layout>
                <t-content style="border-top: 1px solid var(--component-border);">
                    <div style="width: 68vw;height: 80vh;background-color: #FFF1C3">

                    </div>

                </t-content>
            </t-layout>
            <t-aside>
                右侧未知区域
            </t-aside>
        </t-layout>
    </t-layout>
</template>

<script setup>
import IndexHeader from "@/components/index/indexHeader.vue";
import MenuRight from "@/components/home/menuRight.vue";
import ContactList from "@/components/home/contactList.vue";






</script>

<style scoped>

</style>
