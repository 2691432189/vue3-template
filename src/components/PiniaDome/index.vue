<template>
    <div>
        <el-button @click="goPage(1)">user</el-button>
        <el-button @click="goPage(0)">admin</el-button>
    </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

/*
* INFO: 注册组件名称
* **/
defineOptions( { name: 'PiniaDome' } )

const router = useRouter()

const goPage = ( type: number ) => {
    type
        ? router.push( '/user/info' )
        : router.push( '/user/admin' )
}
</script>

<style lang="scss" scoped>

</style>