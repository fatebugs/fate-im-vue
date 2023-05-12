<template>
    <div>
        <indexHeader></indexHeader>
        <index-body></index-body>

<!--        <footer>
            <div class="container">
                <p>版权所有 &copy; 2023，随缘。保留所有权利。</p>
                <p>备案号：<a href="http://beian.miit.gov.cn/" target="_blank">湘ICP备2021010216号</a></p>
            </div>
        </footer>-->

    </div>
</template>

<script setup>
    import indexHeader from "@/components/index/indexHeader.vue";
    import indexBody from "@/components/index/indexBody.vue";

</script>

<style scoped>
footer {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    background-color: #f5f5f5;
    text-align: center;
    padding: 10px 0;
}

</style>
