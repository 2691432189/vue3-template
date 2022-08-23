<template>
    <div>
        <div>hookDome:{{hookDome}}</div>
        <div>{{ state.num }}</div>
        <ElButton @click="add">
            加上
        </ElButton>
    </div>
</template>

<script setup lang="ts" name="User">
import {reactive, toRefs} from 'vue'
import { useComputed } from '@/hooks/dome'

const state = reactive( {
    num: 0
} )

const { num } = toRefs(state)

const hookDome = useComputed(num)

const add = () => {
    state.num++
}


</script>

<style lang="scss" scoped>

</style>