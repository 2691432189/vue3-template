import { defineStore } from 'pinia'

export const useDynamicCache = defineStore( 'useDynamicCache', {
    state: () => {
        return {
            dynamicCacheList: [], // 动态缓存列表
        }
    },
    actions: {
        // 添加动态化缓存
        addDynamicCache( dynamicItem:never ) {
            return this.dynamicCacheList.push( dynamicItem )
        }
    }
} )