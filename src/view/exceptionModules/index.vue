<template>
    <div id="entry_page">
        <PublicNav />

        <TagsNav />

        <RouterView v-slot="{ Component, route }">
            <!--
                mode：过度动画的顺序，out-in先结束后开始
                enter-active-class：进场动画，可在路由中配置
                leave-active-class：出场动画，可在路由中配置
            -->
            <Transition
                mode="out-in"
                :enter-active-class="route.meta.enterActive as string"
                :leave-active-class="route.meta.leaveActive as string"
            >
                <!--
                   include：缓存的路由列表，可在路由中配置
                -->
                <KeepAlive :include="queryDynamicCache(route, Component)" :exclude="state.exclude">
                    <Component
                        :is="Component"
                        :key="route.name"
                    />
                </KeepAlive>
            </Transition>
        </RouterView>
    </div>
</template>

<script setup lang="ts">
import PublicNav from "@/layouts/PublicNav/index.vue"
import TagsNav from '@/layouts/TagsNav/index.vue'
import { computed, reactive } from 'vue'
import { useState } from '@/store'

// pinia页面缓存管理
const { useDynamicCache } = useState()

const state = reactive( {
    num: 0,
    isRouterKeepAlive: true,
    exclude: []
} )

// 返回缓存的动画列表
const queryDynamicCache = computed( () => {
    return ( route: any, Component: any ) => {
        const lookupNmae = useDynamicCache.dynamicCacheList.filter( ( item ) => item?.name === Component?.type.name )

        if ( !lookupNmae.length && route.meta?.keepAlive && Component?.type.name ) {
            useDynamicCache.addDynamicCache( {
                name: Component?.type.name,
                title: route.meta.title,
                url: route.path
            } as never )
        }

        return useDynamicCache.dynamicCacheList.map( ( item ): string => item?.name )
    }
} )
</script>

<style lang="scss" scoped>
#entry_page {

}
</style>