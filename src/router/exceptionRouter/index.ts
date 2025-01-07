const Exception_404 = () => import('@/view/exceptionModules/exception_404/index.vue')

export default [
    {
        path: 'exception_404',
        name: 'exception_404',
        meta: {
            title: '404错误',
            keepAlive: true,
        },
        component: Exception_404,
    }
]