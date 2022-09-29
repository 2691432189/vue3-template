<template>
    <div class="admin">
        <div class="main">
            <div>{{ state.num }}</div>
            <ElButton @click="add">
                加上
            </ElButton>
            <ElButton @click="onReload">
                刷新页面
            </ElButton>
        </div>
    </div>
</template>

<script setup lang="ts" name="Admin">
import {reactive, inject, onMounted} from 'vue'


const state = reactive({
    num: 0
})

const add = () => {
    state.num++
}

// 接收刷新当前路由页面方法,调用即可刷新本页面,参数为当前页面的名字
const reload: any = inject('refresh')
const onReload = () => {
    reload('User')
}


</script>

<style lang="scss" scoped>

</style>