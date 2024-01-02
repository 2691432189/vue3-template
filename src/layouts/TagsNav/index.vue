<template>
    <div class="tags-nav">
        <div
            v-for="item in useDynamicCache.dynamicCacheList"
            :key="item.name"
            class="tag-item"
            :class="{'is-current': item.url === currentTag}"
            @click="goPage(item.url)"
        >
            {{ item.title }}
        </div>
    </div>
</template>

<script setup lang="ts" name="TagsNav">
import { useRoute, useRouter } from "vue-router";
import { computed } from "vue";
import { useState } from "@/store";

const { useDynamicCache } = useState()
const route = useRoute()
const router = useRouter()

const currentTag = computed( () => {
    return route.path
} )

const goPage = ( pageUrl: string ) => {
    pageUrl && router.push( pageUrl )
}

</script>

<style lang="scss" scoped>
.tags-nav {
    display     : flex;
    height      : 32px;
    background  : #EAF2F7;
    padding-top : 4px;
    box-sizing  : border-box;

    .tag-item {
        padding     : 0 24px;
        line-height : 28px;
        font-size   : 12px;
        color       : rgba(0, 0, 0, 0.6);
        cursor      : pointer;
    }

    .is-current {
        color         : #0072C3;
        background    : #FFFFFF;
        border-radius : 10px 10px 0 0;
        position      : relative;

        &::after {
            content    : '';
            position   : absolute;
            left       : -10px;
            bottom     : 0;
            width      : 10px;
            height     : 10px;
            background : radial-gradient(circle at 0% 0%, transparent 10px, #ffffff 0);
        }

        &::before {
            content    : '';
            position   : absolute;
            right      : -10px;
            bottom     : 0;
            width      : 10px;
            height     : 10px;
            background : radial-gradient(circle at 100% 0%, transparent 10px, #ffffff 0);
        }
    }
}
</style>