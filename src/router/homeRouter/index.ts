const HomePage = () => import('@/view/homeModules/homePage/index.vue')

export default [
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