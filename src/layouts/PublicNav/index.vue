<template>
    <div class="public-nav">
        <div class="left">
            <img src="" alt="无法显示">
        </div>

        <div class="right">
            <img src="" alt="无法显示">
            <span>用户_0988</span>
            <el-icon>
                <IEpArrowDown />
            </el-icon>
        </div>
    </div>
</template>

<script setup lang="ts" name="publicNav">
</script>

<style lang="scss" scoped>
.public-nav {
    display         : flex;
    justify-content : space-between;
    align-items     : center;
    background      : #0072C3;
    height          : 70px;
    padding         : 0 32px;
    box-sizing      : border-box;

    .left {
        img {
            width : 144px;
        }
    }

    .right {
        font-size   : 14px;
        color       : #FFFFFF;
        display     : flex;
        align-items : center;
        cursor      : pointer;

        span {
            padding : 0 6px;
        }

        img {
            width         : 23px;
            height        : 23px;
            border-radius : 23px;
        }
    }
}
</style>