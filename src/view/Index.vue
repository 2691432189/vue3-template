<template>
    <div class="entry_page">
        <PiniaDome />
        <div class="main">
            <router-view v-slot="{ Component, route }">
                <!--
                    mode：过度动画的顺序，out-in先结束后开始
                    enter-active-class：进场动画，可在路由中配置
                    leave-active-class：出场动画，可在路由中配置
                -->
                <transition
                    mode="out-in"
                    :enter-active-class="route.meta.enterActive as string"
                    :leave-active-class="route.meta.leaveActive as string"
                >
                    <!--
                       include：缓存的路由列表，可在路由中配置
                    -->
                    <keep-alive :include="queryDynamicCache(route, Component)" :exclude="state.exclude">
                        <component
                            :is="Component"
                            :key="route.name"
                        />
                    </keep-alive>
                </transition>
            </router-view>
        </div>
    </div>
</template>

<script setup lang="ts">
import {computed, onMounted, reactive, provide, nextTick} from 'vue'
import PiniaDome from '@/components/PiniaDome/index.vue'
import { useState } from '@/store'
import dome from '@/services/dome'

const state = reactive( {
    num: 0,
    isRouterKeepAlive: true,
    exclude: []
} )

// 刷新当前路由页面方法，由组件自身调用,name: 页面的名字
const reload = (name:never) => {
    state.exclude.push(name)
    nextTick(() => state.exclude.length = 0)
}
// 将刷新页面方法穿透给子路由页面,或者放到pinia中全局使用
provide('refresh', reload)

// 发送网络请求dome
onMounted( async () => {
    const { code, data } = await dome.get( {
        url: '/user',
        headers: { 'Content-Type': 'application/json;charset=UTF-8' }
    } )

    console.log( data )
} )

// pinia页面缓存管理
const { useDynamicCache } = useState()

// 返回缓存的动画列表
const queryDynamicCache = computed( () => {
    return ( route: any, Component: any ) => {
        if ( !useDynamicCache.dynamicCacheList.includes( Component?.type.name as never ) && route.meta?.keepAlive ) {
            useDynamicCache.addDynamicCache( Component?.type.name as never )
        }
        return useDynamicCache.dynamicCacheList
    }
} )

</script>

<style lang="scss" scoped>
.entry_page {
    .main {
        display         : flex;
        justify-content : center;
        align-items     : center;
        height          : 60vh;
    }
}
</style>