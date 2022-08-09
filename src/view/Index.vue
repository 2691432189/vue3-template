<template>
    <div class="entry_page">
        <PiniaDome />
        <div class="main">
            <router-view v-slot="{ Component, route }">
                <transition
                    :enter-active-class="`animate__animated ${route.meta.enterActive}`"
                    :leave-active-class="`animate__animated ${route.meta.leaveActive}`"
                >
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