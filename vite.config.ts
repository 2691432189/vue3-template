import { defineConfig, loadEnv, ConfigEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import VueSetupExtend from 'vite-plugin-vue-setup-extend'

// @ts-ignore
export default defineConfig( ( { command, mode }: ConfigEnv ) => {
    // 解构环境变量
    const { VITE_APP_PORT } = loadEnv( 'development', './' )

    // 是否为打包
    const isBuild = command === 'build'


    return {
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
        server: {
            // 设置运行端口
            port: VITE_APP_PORT,
            // 设置代理
            proxy: {
                // '/user': {
                //     target: 'http://localhost:8081',
                //     changeOrigin: true,
                //     rewrite: path => path.replace( /^\/api/, '' )
                // },
            }
        },
        build: {
            // 打包为es2015
            target: 'es2015',
            // 打包输出目录
            outDir: 'dist',
            // 打包时删除控制台打印
            terserOptions: {
                compress: {
                    drop_console: isBuild,
                    drop_debugger: isBuild
                },
            },
        },
    }
} )
