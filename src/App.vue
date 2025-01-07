<template>
    <RouterView />
</template>

<script setup lang="ts">
import 'animate.css'
import 'normalize.css'
// 自动引入组件，需单独引入element-plus弹框类样式
import "element-plus/theme-chalk/el-loading.css"
import "element-plus/theme-chalk/el-message.css"
import "element-plus/theme-chalk/el-notification.css"
import "element-plus/theme-chalk/el-message-box.css"
</script>

<style lang="scss">
// 新版scss已经弃用@import，请使用@use
@use "@/style/index.scss";

</style>