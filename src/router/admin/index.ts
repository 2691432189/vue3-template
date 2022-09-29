const user = () => import('@/view/User/index.vue')
const admin = () => import('@/view/Admin/index.vue')

export default {
    path: '/user',
    children: [
        {
            path: '/user/info',
            name: 'User',
            meta: {
                keepAlive: true,
                leaveActive: 'animate__animated animate__bounceOut',
                enterActive: 'animate__animated animate__fadeInUp'
            },
            component: user,
        },
        {
            path: '/user/admin',
            name: 'Admin',
            meta: {
                keepAlive: true,
                leaveActive: 'animate__animated animate__bounceOut',
                enterActive: 'animate__animated animate__fadeInUp'
            },
            component: admin,
        },
    ]
}