const user = () => import('@/view/User/index.vue')
const admin = () => import('@/view/Admin/index.vue')

export default {
    path: '/user',
    children: [
        {
            path: '/user/info',
            name: 'userInfo',
            meta: {
                keepAlive: true,
                leaveActive: 'animate__backOutDown',
                enterActive: 'animate__bounceInUp'
            },
            component: user,
        },
        {
            path: '/user/admin',
            name: 'userAdmin',
            meta: {
                keepAlive: true,
                leaveActive: 'animate__backOutDown',
                enterActive: 'animate__bounceInUp'
            },
            component: admin,
        },
    ]
}