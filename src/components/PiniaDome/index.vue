<template>
    <div>
        <el-button @click="goPage(1)">user</el-button>
        <el-button @click="goPage(0)">admin</el-button>
    </div>
</template>

<script setup lang="ts" name="PiniaDome">
import { useRouter } from 'vue-router'

const router = useRouter()

const goPage = ( type: number ) => {
    type
        ? router.push( '/user/info' )
        : router.push( '/user/admin' )
}
</script>

<style lang="scss" scoped>

</style>