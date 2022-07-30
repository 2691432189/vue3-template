<template>
    <div>
        <PiniaDome />
        <router-view v-slot="{ Component, route }">
            <transition
                :name="route.meta?.transition"
                mode="out-in"
            >
                <keep-alive :include="queryDynamicCache(route, Component)">
                    <component
                        :is="Component"
                        :key="route?.path"
                    />
                </keep-alive>
            </transition>
        </router-view>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import PiniaDome from '@/components/PiniaDome/index.vue'
import { useState } from '@/store'

const { useDynamicCache } = useState()


const queryDynamicCache = computed( () => {
    return ( route: any, Component: any ) => {
        if ( !useDynamicCache.dynamicCacheList.includes( Component?.type.name as never ) && route.meta?.keepAlive ) {
            useDynamicCache.addDynamicCache(Component?.type.name as never)
        }
        return useDynamicCache.dynamicCacheList
    }
} )

</script>

<style lang="scss" scoped>

</style>