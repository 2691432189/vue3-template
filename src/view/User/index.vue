<template>
    <div>
        <div>{{ state.num }}</div>
        <ElButton @click="add">
            加上
        </ElButton>
    </div>
</template>

<script setup lang="ts" name="User">
import { reactive } from 'vue'

const state = reactive( {
    num: 0
} )

const add = () => {
    state.num++
}


</script>

<style lang="scss" scoped>

</style>