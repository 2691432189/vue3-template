<template>
    <div id="home_page">
        homePage
    </div>
</template>

<script setup lang="ts" name="homePage">

import { user } from "@/services/home/modules/reqDome";
import { onMounted } from "vue";

console.log('homePage')

onMounted(() => {
    test()
    test()
    test()
})

const test = async() => {
    console.log(11111)
    const res =  await user( {} )

    console.log(res)
}

</script>

<style scoped lang="scss">
#home_page {

}
</style>