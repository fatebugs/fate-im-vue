<template>
    <router-view :key="key"></router-view>
</template>

<script setup>
import {useRoute} from "vue-router";
import {computed} from "vue";

const route = useRoute();
const key = computed(() => {
    return route.path + Math.random();
});


</script>

<style scoped>

</style>
