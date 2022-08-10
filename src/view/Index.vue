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
                    :enter-active-class="route.meta.enterActive"
                    :leave-active-class="route.meta.leaveActive"
                >
                    <!--
                       include：缓存的路由列表，可在路由中配置
                    -->
                    <keep-alive :include="queryDynamicCache(route, Component)">
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
import { computed } from 'vue'
import PiniaDome from '@/components/PiniaDome/index.vue'
import { useState } from '@/store'

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
        display: flex;
        justify-content: center;
        align-items: center;
        height: 60vh;
    }
}
</style>