import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import VueSetupExtend from 'vite-plugin-vue-setup-extend'

export default defineConfig( {
    plugins: [
        vue(),
        // 给setup组件添加name
        VueSetupExtend(),
        // 自动引入依赖的Element-ui
        AutoImport( {
            resolvers: [ ElementPlusResolver() ],
        } ),
        Components( {
            resolvers: [ ElementPlusResolver() ],
        } )
    ],
    resolve: {
        // 配置绝对路径
        alias: {
            '@': resolve( __dirname, 'src' )
        }
    },
} )
