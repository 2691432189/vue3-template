const user = () => import('@/view/User/index.vue')
const admin = () => import('@/view/Admin/index.vue')

export default {
    path: '/user',
    children: [
        {
            path: '/user/info',
            meta: {
                keepAlive: true,
                transition: 'slide-fade',
            },
            component: user,
        },
        {
            path: '/user/admin',
            meta: {
                keepAlive: true,
                transition: 'slide-fade',
            },
            component: admin,
        },
    ]
}