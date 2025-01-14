import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import App from './App.vue'
import router from '@/router/index'

createApp( App )
    .use( router )
    .use( createPinia() )
    .use( ElementPlus, {
        locale: zhCn,
    } )
    .mount( '#app' )

