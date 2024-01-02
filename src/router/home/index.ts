const HomeModules = () => import('@/view/homeModules/index.vue')
const HomePage = () => import('@/view/homeModules/homePage/index.vue')

export default {
    path: '/home',
    component: HomeModules,
    children: [
        {
            path: 'homePage',
            name: 'homePage',
            meta: {
                title: '首页',
                keepAlive: true,
            },
            component: HomePage,
        }
    ]
}